import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(databaseUrl);
}

export function normalizeProjectId(value: string) {
  return value.trim().toUpperCase();
}

export function hashPassword(
  password: string,
  salt: string,
) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function verifyPassword(
  password: string,
  salt: string,
  storedHash: string,
) {
  const derived = Buffer.from(
    hashPassword(password, salt),
    "hex",
  );

  const stored = Buffer.from(storedHash, "hex");

  if (derived.length !== stored.length) {
    return false;
  }

  return timingSafeEqual(derived, stored);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export function getCookie(
  req: VercelRequest,
  name: string,
) {
  const header = req.headers.cookie ?? "";

  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

export function setSessionCookie(
  res: VercelResponse,
  token: string,
) {
  const secure =
    process.env.NODE_ENV === "production"
      ? "; Secure"
      : "";

  res.setHeader(
    "Set-Cookie",
    [
      `glowstone_session=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=604800",
      secure.slice(2),
    ]
      .filter(Boolean)
      .join("; "),
  );
}

export function clearSessionCookie(
  res: VercelResponse,
) {
  res.setHeader(
    "Set-Cookie",
    "glowstone_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
  );
}

export async function getAuthenticatedProject(
  req: VercelRequest,
) {
  const token = getCookie(
    req,
    "glowstone_session",
  );

  if (!token) {
    return null;
  }

  const sql = getSql();
  const tokenHash = hashSessionToken(token);

  const rows = await sql`
    SELECT
      p.project_id,
      p.client_name,
      p.client_email,
      p.client_phone,
      p.project_name,
      p.project_description,
      p.website_url,
      p.project_fee::int AS project_fee,
      p.amount_paid::int AS amount_paid,
      p.security_deposit::int AS security_deposit,
      p.progress::int AS progress,
      p.status
    FROM glowstone_client_sessions s
    INNER JOIN glowstone_projects p
      ON p.project_id = s.project_id
    WHERE s.token_hash = ${tokenHash}
      AND s.expires_at > NOW()
    LIMIT 1
  `;

  return rows[0] ?? null;
}

export async function getAuthenticatedProjectId(
  req: VercelRequest,
) {
  const project = await getAuthenticatedProject(req);

  return project?.project_id
    ? String(project.project_id)
    : null;
}
