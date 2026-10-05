import {
  createHmac,
} from "node:crypto";
import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(
  req: VercelRequest,
) {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk),
    );
  }

  return Buffer.concat(chunks);
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
    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(503).json({
        error: "Webhook secret is not configured.",
      });
    }

    const rawBody =
      await readRawBody(req);

    const signature = String(
      req.headers["x-razorpay-signature"] ?? "",
    );

    const expected =
      createHmac(
        "sha256",
        webhookSecret,
      )
        .update(rawBody)
        .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({
        error: "Invalid webhook signature.",
      });
    }

    const event = JSON.parse(
      rawBody.toString("utf8"),
    );

    if (
      event.event !== "order.paid"
    ) {
      return res.status(200).json({
        received: true,
      });
    }

    const payment =
      event.payload?.payment?.entity;

    const orderId =
      payment?.order_id;

    const paymentId =
      payment?.id;

    const amountInPaise =
      Number(payment?.amount ?? 0);

    if (
      !orderId ||
      !paymentId ||
      !amountInPaise
    ) {
      return res.status(400).json({
        error: "Incomplete payment payload.",
      });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({
        error: "DATABASE_URL is not configured.",
      });
    }

    const sql = neon(
      process.env.DATABASE_URL,
    );

    const orders = await sql`
      SELECT
        project_id,
        amount_inr::int AS amount_inr
      FROM glowstone_payment_orders
      WHERE razorpay_order_id = ${String(orderId)}
      LIMIT 1
    `;

    const order = orders[0];

    if (!order) {
      return res.status(404).json({
        error: "Order not found.",
      });
    }

    const amountInRupees =
      Math.round(
        amountInPaise / 100,
      );

    if (
      amountInRupees !==
      Number(order.amount_inr)
    ) {
      return res.status(400).json({
        error: "Webhook amount mismatch.",
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
        ${String(order.project_id)},
        ${String(orderId)},
        ${String(paymentId)},
        ${amountInRupees},
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
            amount_paid + ${amountInRupees}
          ),
          updated_at = NOW()
        WHERE project_id = ${String(order.project_id)}
      `;
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Webhook processing failed.",
    });
  }
}
