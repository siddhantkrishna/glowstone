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

    const keyId =
      process.env.RAZORPAY_KEY_ID;

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(503).json({
        error: "Razorpay is not configured yet.",
      });
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body ?? {};

    const requestedAmount = Number(
      body.amount,
    );

    const projectFee = Number(
      project.project_fee,
    );

    const amountPaid = Number(
      project.amount_paid,
    );

    const balance = Math.max(
      0,
      projectFee - amountPaid,
    );

    if (!Number.isInteger(requestedAmount)) {
      return res.status(400).json({
        error: "Payment amount must be a whole number.",
      });
    }

    if (balance <= 0) {
      return res.status(400).json({
        error: "This project has no outstanding balance.",
      });
    }

    const minimumPayment =
      Math.min(2000, balance);

    if (
      requestedAmount < minimumPayment ||
      requestedAmount > balance
    ) {
      return res.status(400).json({
        error: `Payment must be between ₹${minimumPayment.toLocaleString("en-IN")} and ₹${balance.toLocaleString("en-IN")}.`,
      });
    }

    const amountInPaise =
      requestedAmount * 100;

    const receipt =
      `GS-${String(project.project_id).slice(0, 20)}-${Date.now()
        .toString()
        .slice(-8)}`;

    const auth = Buffer.from(
      `${keyId}:${keySecret}`,
    ).toString("base64");

    const razorpayResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt,
          notes: {
            project_id: String(
              project.project_id,
            ),
            client_name: String(
              project.client_name,
            ),
          },
        }),
      },
    );

    const razorpayOrder =
      await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error(
        "Razorpay order creation failed:",
        razorpayOrder,
      );

      return res.status(502).json({
        error: "Razorpay could not create the payment order.",
      });
    }

    const sql = getSql();

    await sql`
      INSERT INTO glowstone_payment_orders (
        project_id,
        razorpay_order_id,
        amount_inr,
        status
      )
      VALUES (
        ${String(project.project_id)},
        ${String(razorpayOrder.id)},
        ${requestedAmount},
        'created'
      )
      ON CONFLICT (razorpay_order_id)
      DO NOTHING
    `;

    return res.status(200).json({
      keyId,
      orderId: String(
        razorpayOrder.id,
      ),
      amount: amountInPaise,
      currency: "INR",
      amountInr: requestedAmount,
      projectName: String(
        project.project_name,
      ),
      clientName: String(
        project.client_name,
      ),
      clientEmail:
        project.client_email
          ? String(project.client_email)
          : "",
      clientPhone:
        project.client_phone
          ? String(project.client_phone)
          : "",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to start payment.",
    });
  }
}
