import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";

import {
  createSessionToken,
  hashSessionToken,
  normalizeProjectId,
  setSessionCookie,
  verifyPassword,
} from "../../src/server/clientAuth";

export const runtime = "nodejs";

function send(
  res: VercelResponse,
  status: number,
  body: Record<string, unknown>,
) {
  res.status(status);
  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8",
  );
  res.end(JSON.stringify(body));
}

function safeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    if (req.method !== "POST") {
      return send(res, 405, {
        error: "Method not allowed.",
      });
    }

    const databaseUrl =
      process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error(
        "LOGIN: DATABASE_URL missing",
      );

      return send(res, 500, {
        error:
          "Database configuration is missing on the production server.",
      });
    }

    let body: Record<
      string,
      unknown
    > = {};

    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body)
          : (req.body ?? {});
    } catch {
      return send(res, 400, {
        error:
          "Invalid request body.",
      });
    }

    const projectId =
      normalizeProjectId(
        String(body.projectId ?? ""),
      );

    const password = String(
      body.password ?? "",
    );

    if (!projectId || !password) {
      return send(res, 400, {
        error:
          "Project ID and password are required.",
      });
    }

    const sql = neon(
      databaseUrl,
    );

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
      WHERE UPPER(project_id) = ${projectId}
      LIMIT 1
    `;

    const project = rows[0];

    if (!project) {
      return send(res, 401, {
        error:
          "Invalid project ID or password.",
      });
    }

    const valid =
      verifyPassword(
        password,
        String(project.password_salt),
        String(project.password_hash),
      );

    if (!valid) {
      return send(res, 401, {
        error:
          "Invalid project ID or password.",
      });
    }

    const sessionToken =
      createSessionToken();

    const tokenHash =
      hashSessionToken(
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
        ${String(project.project_id)},
        NOW() + INTERVAL '7 days'
      )
    `;

    setSessionCookie(
      res,
      sessionToken,
    );

    return send(res, 200, {
      project: {
        projectId: String(
          project.project_id,
        ),
        clientName: String(
          project.client_name,
        ),
        projectName: String(
          project.project_name,
        ),
        projectFee: Number(
          project.project_fee,
        ),
        amountPaid: Number(
          project.amount_paid,
        ),
        progress: Number(
          project.progress,
        ),
        status: String(
          project.status,
        ),
      },
    });
  } catch (error) {
    console.error(
      "LOGIN FUNCTION ERROR:",
      error,
    );

    return send(res, 500, {
      error:
        `Server error: ${safeError(error)}`,
    });
  }
}
