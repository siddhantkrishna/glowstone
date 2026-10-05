import fs from "node:fs";
import readline from "node:readline";
import {
  randomBytes,
  scryptSync,
} from "node:crypto";
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
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(label) {
  return new Promise((resolve) => {
    rl.question(label, (answer) => resolve(answer.trim()));
  });
}

function hiddenQuestion(label) {
  return new Promise((resolve) => {
    const stdin = process.stdin;

    process.stdout.write(label);

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    let value = "";

    const onData = (char) => {
      if (char === "\u0003") {
        process.exit(130);
      }

      if (char === "\r" || char === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(value);
        return;
      }

      if (char === "\u007f") {
        value = value.slice(0, -1);
        return;
      }

      value += char;
    };

    stdin.on("data", onData);
  });
}

function hashPassword(password, salt) {
  return scryptSync(password, salt, 64).toString("hex");
}

console.log("\nGLOWSTONEE CLIENT CREATOR\n");

const projectId = (await question("Project ID: "))
  .toUpperCase()
  .replace(/\s+/g, "-");

const clientName = await question("Client name: ");
const clientEmail = await question("Client email: ");
const clientPhone = await question("Client phone: ");

const projectName = await question("Project name: ");
const projectDescription = await question("Project description: ");
const websiteUrl = await question("Website URL: ");

const projectFee = Number(
  await question("Project fee (INR): ")
);

const amountPaidInput = await question(
  "Amount already paid (INR, default 0): "
);

const progressInput = await question(
  "Project progress % (default 0): "
);

const password = await hiddenQuestion(
  "Client password: "
);

rl.close();

if (!projectId || !clientName || !projectName) {
  throw new Error("Project ID, client name and project name are required.");
}

if (!Number.isInteger(projectFee) || projectFee < 0) {
  throw new Error("Project fee must be a valid INR integer.");
}

const amountPaid =
  amountPaidInput === ""
    ? 0
    : Number(amountPaidInput);

const progress =
  progressInput === ""
    ? 0
    : Number(progressInput);

if (!Number.isInteger(amountPaid) || amountPaid < 0) {
  throw new Error("Amount paid must be a valid INR integer.");
}

if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
  throw new Error("Progress must be between 0 and 100.");
}

if (amountPaid > projectFee) {
  throw new Error("Amount paid cannot exceed project fee.");
}

if (password.length < 8) {
  throw new Error("Password must be at least 8 characters.");
}

const salt = randomBytes(16).toString("hex");
const passwordHash = hashPassword(password, salt);

await sql`
  INSERT INTO glowstone_projects (
    project_id,
    password_salt,
    password_hash,
    client_name,
    client_email,
    client_phone,
    project_name,
    project_description,
    website_url,
    project_fee,
    amount_paid,
    progress
  )
  VALUES (
    ${projectId},
    ${salt},
    ${passwordHash},
    ${clientName},
    ${clientEmail || null},
    ${clientPhone || null},
    ${projectName},
    ${projectDescription || null},
    ${websiteUrl || null},
    ${projectFee},
    ${amountPaid},
    ${progress}
  )
`;

const phases = [
  ["Discovery & strategy", "Project goals, requirements and direction.", 0],
  ["Wireframes", "Structure and information architecture.", 0],
  ["UI / UX design", "Visual design and interaction system.", 0],
  ["Development", "Frontend and backend implementation.", 0],
  ["Testing & refinement", "QA, responsive checks and revisions.", 0],
  ["Launch", "Deployment, configuration and handover.", 0],
];

for (let i = 0; i < phases.length; i++) {
  const [title, description, phaseProgress] = phases[i];

  await sql`
    INSERT INTO glowstone_deliverables (
      project_id,
      title,
      description,
      progress,
      status,
      sort_order
    )
    VALUES (
      ${projectId},
      ${title},
      ${description},
      ${phaseProgress},
      'Upcoming',
      ${i}
    )
  `;
}

console.log("\nCLIENT CREATED\n");
console.log(`Project ID : ${projectId}`);
console.log(`Password   : ${password}`);
console.log(`Project fee: ₹${projectFee.toLocaleString("en-IN")}`);
console.log(`Paid       : ₹${amountPaid.toLocaleString("en-IN")}`);
console.log(
  `Balance    : ₹${(projectFee - amountPaid).toLocaleString("en-IN")}`
);
console.log("\n");
