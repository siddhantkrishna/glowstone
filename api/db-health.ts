import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      return res.status(500).json({
        ok: false,
        error: 'DATABASE_URL is not configured',
      });
    }

    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() AS time`;

    return res.status(200).json({
      ok: true,
      database: 'neon',
      time: result[0]?.time ?? null,
    });
  } catch (error) {
    console.error('Database health check failed:', error);

    return res.status(500).json({
      ok: false,
      error: 'Database connection failed',
    });
  }
}
