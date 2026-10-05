import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!fs.existsSync(file)) continue;

    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match) continue;

      let value = match[2].trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[match[1]] ??= value;
    }
  }
}

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing from .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS glowstone_projects (
    project_id TEXT PRIMARY KEY,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,

    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,

    project_name TEXT NOT NULL,
    project_description TEXT,
    website_url TEXT,

    project_fee INTEGER NOT NULL DEFAULT 0 CHECK (project_fee >= 0),
    amount_paid INTEGER NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
    security_deposit INTEGER NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),

    progress INTEGER NOT NULL DEFAULT 0
      CHECK (progress BETWEEN 0 AND 100),

    status TEXT NOT NULL DEFAULT 'In progress',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS glowstone_deliverables (
    id BIGSERIAL PRIMARY KEY,

    project_id TEXT NOT NULL
      REFERENCES glowstone_projects(project_id)
      ON DELETE CASCADE,

    title TEXT NOT NULL,
    description TEXT,

    progress INTEGER NOT NULL DEFAULT 0
      CHECK (progress BETWEEN 0 AND 100),

    status TEXT NOT NULL DEFAULT 'Upcoming',

    sort_order INTEGER NOT NULL DEFAULT 0
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS glowstone_client_sessions (
    token_hash TEXT PRIMARY KEY,

    project_id TEXT NOT NULL
      REFERENCES glowstone_projects(project_id)
      ON DELETE CASCADE,

    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS glowstone_payment_orders (
    id BIGSERIAL PRIMARY KEY,

    project_id TEXT NOT NULL
      REFERENCES glowstone_projects(project_id)
      ON DELETE CASCADE,

    razorpay_order_id TEXT NOT NULL UNIQUE,
    amount_inr INTEGER NOT NULL CHECK (amount_inr > 0),

    status TEXT NOT NULL DEFAULT 'created',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS glowstone_payment_transactions (
    id BIGSERIAL PRIMARY KEY,

    project_id TEXT NOT NULL
      REFERENCES glowstone_projects(project_id)
      ON DELETE CASCADE,

    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT NOT NULL UNIQUE,

    amount_inr INTEGER NOT NULL CHECK (amount_inr > 0),

    status TEXT NOT NULL DEFAULT 'captured',
    method TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS glowstone_sessions_project_idx
  ON glowstone_client_sessions(project_id)
`;

await sql`
  CREATE INDEX IF NOT EXISTS glowstone_sessions_expiry_idx
  ON glowstone_client_sessions(expires_at)
`;

await sql`
  CREATE INDEX IF NOT EXISTS glowstone_deliverables_project_idx
  ON glowstone_deliverables(project_id, sort_order)
`;

await sql`
  CREATE INDEX IF NOT EXISTS glowstone_payment_project_idx
  ON glowstone_payment_transactions(project_id, created_at DESC)
`;

console.log("Glowstone client portal database ready.");
