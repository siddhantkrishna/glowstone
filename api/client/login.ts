import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import {
  createSessionToken,
  hashPassword,
  hashSessionToken,
  normalizeProjectId,
  setSessionCookie,
  verifyPassword,
} from "../../src/server/clientAuth";

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return neon(process.env.DATABASE_URL);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body ?? {};

    const projectId = normalizeProjectId(
      String(body.projectId ?? ""),
    );

    const password = String(
      body.password ?? "",
    );

    if (!projectId || !password) {
      return res.status(400).json({
        error: "Project ID and password are required.",
      });
    }

    const sql = getSql();

    await sql`
      DELETE FROM glowstone_client_sessions
      WHERE expires_at <= NOW()
    `;

    const rows = await sql`
      SELECT
        project_id,
        password_salt,
        password_hash,
        client_name,
        project_name,
        project_fee::int AS project_fee,
        amount_paid::int AS amount_paid,
        progress::int AS progress,
        status
      FROM glowstone_projects
      WHERE project_id = ${projectId}
      LIMIT 1
    `;

    const project = rows[0];

    if (!project) {
      return res.status(401).json({
        error: "Invalid project ID or password.",
      });
    }

    const valid = verifyPassword(
      password,
      String(project.password_salt),
      String(project.password_hash),
    );

    if (!valid) {
      return res.status(401).json({
        error: "Invalid project ID or password.",
      });
    }

    const sessionToken = createSessionToken();
    const tokenHash = hashSessionToken(
      sessionToken,
    );

    await sql`
      INSERT INTO glowstone_client_sessions (
        token_hash,
        project_id,
        expires_at
      )
      VALUES (
        ${tokenHash},
        ${projectId},
        NOW() + INTERVAL '7 days'
      )
    `;

    setSessionCookie(
      res,
      sessionToken,
    );

    return res.status(200).json({
      project: {
        projectId,
        clientName: String(project.client_name),
        projectName: String(project.project_name),
        projectFee: Number(project.project_fee),
        amountPaid: Number(project.amount_paid),
        progress: Number(project.progress),
        status: String(project.status),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to sign in right now.",
    });
  }
}
