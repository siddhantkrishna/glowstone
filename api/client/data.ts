import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import {
  getAuthenticatedProject,
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
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const project =
      await getAuthenticatedProject(req);

    if (!project) {
      return res.status(401).json({
        error: "Authentication required.",
      });
    }

    const sql = getSql();

    const deliverables = await sql`
      SELECT
        id::int AS id,
        title,
        description,
        progress::int AS progress,
        status,
        sort_order::int AS sort_order
      FROM glowstone_deliverables
      WHERE project_id = ${String(project.project_id)}
      ORDER BY sort_order ASC, id ASC
    `;

    const payments = await sql`
      SELECT
        razorpay_payment_id,
        amount_inr::int AS amount_inr,
        status,
        method,
        created_at
      FROM glowstone_payment_transactions
      WHERE project_id = ${String(project.project_id)}
      ORDER BY created_at DESC
    `;

    const projectFee = Number(
      project.project_fee,
    );

    const amountPaid = Number(
      project.amount_paid,
    );

    return res.status(200).json({
      project: {
        projectId: String(project.project_id),
        clientName: String(project.client_name),
        clientEmail: project.client_email
          ? String(project.client_email)
          : "",
        clientPhone: project.client_phone
          ? String(project.client_phone)
          : "",
        projectName: String(project.project_name),
        projectDescription:
          project.project_description
            ? String(project.project_description)
            : "",
        websiteUrl: project.website_url
          ? String(project.website_url)
          : "",
        projectFee,
        amountPaid,
        securityDeposit: Number(
          project.security_deposit,
        ),
        balanceDue: Math.max(
          0,
          projectFee - amountPaid,
        ),
        progress: Number(project.progress),
        status: String(project.status),
      },
      deliverables,
      payments: payments.map((payment) => ({
        id: String(
          payment.razorpay_payment_id,
        ),
        amount: Number(payment.amount_inr),
        status: String(payment.status),
        method: payment.method
          ? String(payment.method)
          : "",
        createdAt: payment.created_at,
      })),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to load your project.",
    });
  }
}
