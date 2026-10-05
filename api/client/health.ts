import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader(
    "Content-Type",
    "application/json; charset=utf-8",
  );

  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  try {
    const databaseUrl =
      process.env.DATABASE_URL;

    if (!databaseUrl) {
      return res.status(500).json({
        ok: false,
        error:
          "DATABASE_URL is missing on Vercel.",
      });
    }

    const sql = neon(databaseUrl);

    const result = await sql`
      SELECT
        NOW() AS server_time,
        COUNT(*)::int AS project_count
      FROM glowstone_projects
    `;

    return res.status(200).json({
      ok: true,
      database: true,
      tables: {
        glowstone_projects: true,
      },
      projectCount: Number(
        result[0]?.project_count ?? 0,
      ),
      razorpayConfigured: Boolean(
        process.env.RAZORPAY_KEY_ID &&
        process.env.RAZORPAY_KEY_SECRET &&
        process.env.RAZORPAY_WEBHOOK_SECRET,
      ),
    });
  } catch (error) {
    console.error(
      "CLIENT HEALTH ERROR:",
      error,
    );

    return res.status(500).json({
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown server error.",
    });
  }
}
