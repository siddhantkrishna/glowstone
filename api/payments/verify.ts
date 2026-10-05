import {
  createHmac,
} from "node:crypto";
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
  if (req.method !== "POST") {
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

    const secret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return res.status(503).json({
        error: "Razorpay is not configured yet.",
      });
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body ?? {};

    const orderId = String(
      body.razorpay_order_id ?? "",
    );

    const paymentId = String(
      body.razorpay_payment_id ?? "",
    );

    const signature = String(
      body.razorpay_signature ?? "",
    );

    if (
      !orderId ||
      !paymentId ||
      !signature
    ) {
      return res.status(400).json({
        error: "Incomplete payment verification payload.",
      });
    }

    const sql = getSql();

    const orderRows = await sql`
      SELECT
        razorpay_order_id,
        project_id,
        amount_inr::int AS amount_inr
      FROM glowstone_payment_orders
      WHERE razorpay_order_id = ${orderId}
        AND project_id = ${String(project.project_id)}
      LIMIT 1
    `;

    const storedOrder = orderRows[0];

    if (!storedOrder) {
      return res.status(404).json({
        error: "Payment order not found.",
      });
    }

    const expectedSignature =
      createHmac(
        "sha256",
        secret,
      )
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        error: "Payment signature verification failed.",
      });
    }

    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${secret}`,
    ).toString("base64");

    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      },
    );

    const payment =
      await paymentResponse.json();

    if (
      !paymentResponse.ok ||
      payment.status !== "captured"
    ) {
      return res.status(409).json({
        error: "Payment has not been captured yet.",
      });
    }

    const paidAmountInRupees =
      Math.round(
        Number(payment.amount) / 100,
      );

    if (
      paidAmountInRupees !==
      Number(storedOrder.amount_inr)
    ) {
      return res.status(400).json({
        error: "Payment amount mismatch.",
      });
    }

    const inserted = await sql`
      INSERT INTO glowstone_payment_transactions (
        project_id,
        razorpay_order_id,
        razorpay_payment_id,
        amount_inr,
        status,
        method
      )
      VALUES (
        ${String(project.project_id)},
        ${orderId},
        ${paymentId},
        ${paidAmountInRupees},
        'captured',
        ${payment.method ?? null}
      )
      ON CONFLICT (razorpay_payment_id)
      DO NOTHING
      RETURNING id
    `;

    if (inserted.length > 0) {
      await sql`
        UPDATE glowstone_projects
        SET
          amount_paid = LEAST(
            project_fee,
            amount_paid + ${paidAmountInRupees}
          ),
          updated_at = NOW()
        WHERE project_id = ${String(project.project_id)}
      `;
    }

    const refreshed = await sql`
      SELECT
        project_fee::int AS project_fee,
        amount_paid::int AS amount_paid
      FROM glowstone_projects
      WHERE project_id = ${String(project.project_id)}
      LIMIT 1
    `;

    const current = refreshed[0];

    return res.status(200).json({
      success: true,
      paymentId,
      amountPaid: Number(
        current?.amount_paid ?? 0,
      ),
      balanceDue: Math.max(
        0,
        Number(current?.project_fee ?? 0) -
          Number(current?.amount_paid ?? 0),
      ),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to verify payment.",
    });
  }
}
