import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import {
  clearSessionCookie,
  getCookie,
  hashSessionToken,
} from "../../src/server/clientAuth";

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
    if (process.env.DATABASE_URL) {
      const sql = neon(
        process.env.DATABASE_URL,
      );

      const token = getCookie(
        req,
        "glowstone_session",
      );

      if (token) {
        await sql`
          DELETE FROM glowstone_client_sessions
          WHERE token_hash = ${hashSessionToken(token)}
        `;
      }
    }

    clearSessionCookie(res);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    clearSessionCookie(res);

    return res.status(200).json({
      ok: true,
    });
  }
}
