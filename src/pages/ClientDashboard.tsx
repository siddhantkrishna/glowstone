import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

type Project = {
  projectId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  projectDescription: string;
  websiteUrl: string;
  projectFee: number;
  amountPaid: number;
  securityDeposit: number;
  balanceDue: number;
  progress: number;
  status: string;
};

type Deliverable = {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  sort_order: number;
};

type Payment = {
  id: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: Record<
        string,
        unknown
      >,
    ) => {
      open: () => void;
    };
  }
}

function formatINR(
  value: number,
) {
  return `₹${value.toLocaleString(
    "en-IN",
  )}`;
}

async function loadRazorpay() {
  if (window.Razorpay) {
    return;
  }

  await new Promise<void>(
    (resolve, reject) => {
      const existing =
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
        );

      if (existing) {
        existing.addEventListener(
          "load",
          () => resolve(),
        );

        existing.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Razorpay could not be loaded.",
              ),
            ),
        );

        return;
      }

      const script =
        document.createElement(
          "script",
        );

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () =>
        resolve();

      script.onerror = () =>
        reject(
          new Error(
            "Razorpay could not be loaded.",
          ),
        );

      document.body.appendChild(
        script,
      );
    },
  );
}

export default function ClientDashboard() {
  const navigate = useNavigate();

  const { projectId } =
    useParams();

  const [project, setProject] =
    useState<Project | null>(null);

  const [deliverables, setDeliverables] =
    useState<Deliverable[]>([]);

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [paying, setPaying] =
    useState(false);

  const [paymentError, setPaymentError] =
    useState("");

  const fetchProject =
    useCallback(async () => {
      const response =
        await fetch(
          "/api/client/data",
          {
            credentials:
              "include",
          },
        );

      if (response.status === 401) {
        navigate("/invoice");
        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load project.",
        );
      }

      const loadedProject =
        data.project as Project;

      if (
        projectId &&
        loadedProject.projectId !==
          decodeURIComponent(projectId)
      ) {
        navigate(
          `/client/${encodeURIComponent(
            loadedProject.projectId,
          )}`,
          { replace: true },
        );
      }

      setProject(
        loadedProject,
      );

      setDeliverables(
        data.deliverables ?? [],
      );

      setPayments(
        data.payments ?? [],
      );
    }, [navigate, projectId]);

  useEffect(() => {
    fetchProject()
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load project.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchProject]);

  const minimumPayment =
    project
      ? Math.min(
          2000,
          project.balanceDue,
        )
      : 2000;

  const maximumPayment =
    project
      ? project.balanceDue
      : 0;

  const [paymentAmount, setPaymentAmount] =
    useState(2000);

  useEffect(() => {
    if (!project) return;

    setPaymentAmount(
      Math.min(
        Math.max(
          minimumPayment,
          paymentAmount,
        ),
        maximumPayment,
      ),
    );
  }, [
    project,
    minimumPayment,
    maximumPayment,
    paymentAmount,
  ]);

  const paymentPercentage =
    useMemo(() => {
      if (!project || !project.projectFee) {
        return 0;
      }

      return Math.min(
        100,
        Math.round(
          (project.amountPaid /
            project.projectFee) *
            100,
        ),
      );
    }, [project]);

  async function handleLogout() {
    await fetch(
      "/api/client/logout",
      {
        method: "POST",
        credentials:
          "include",
      },
    );

    navigate("/invoice");
  }

  async function handlePayment() {
    if (
      !project ||
      project.balanceDue <= 0 ||
      paymentAmount <= 0
    ) {
      return;
    }

    setPaying(true);
    setPaymentError("");

    try {
      await loadRazorpay();

      const orderResponse =
        await fetch(
          "/api/payments/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            credentials:
              "include",
            body: JSON.stringify({
              amount:
                paymentAmount,
            }),
          },
        );

      const order =
        await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          order.error ||
            "Unable to create payment.",
        );
      }

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay is unavailable.",
        );
      }

      const razorpay =
        new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency:
            order.currency,
          name: "Glowstonee",
          description:
            order.projectName,
          order_id:
            order.orderId,
          prefill: {
            name:
              order.clientName,
            email:
              order.clientEmail,
            contact:
              order.clientPhone,
          },
          notes: {
            project_id:
              project.projectId,
          },
          theme: {
            color:
              "#5B3FD6",
          },
          modal: {
            ondismiss: () => {
              setPaying(false);
            },
          },
          handler: async (
            response: Record<
              string,
              string
            >,
          ) => {
            try {
              const verification =
                await fetch(
                  "/api/payments/verify",
                  {
                    method:
                      "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    credentials:
                      "include",
                    body: JSON.stringify(
                      response,
                    ),
                  },
                );

              const result =
                await verification.json();

              if (
                !verification.ok
              ) {
                throw new Error(
                  result.error ||
                    "Payment verification failed.",
                );
              }

              await fetchProject();
            } catch (err) {
              setPaymentError(
                err instanceof Error
                  ? err.message
                  : "Payment verification failed.",
              );
            } finally {
              setPaying(false);
            }
          },
        });

      razorpay.open();
    } catch (err) {
      setPaymentError(
        err instanceof Error
          ? err.message
          : "Unable to start payment.",
      );

      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main className="glowstone-portal-loading">
        <div className="glowstone-portal-loader-mark">
          <img
            src="/brand/glowstone-mark.png"
            alt=""
          />
        </div>

        <span>
          Loading your project
        </span>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="glowstone-portal-loading">
        <div>
          <h1>
            Project unavailable.
          </h1>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate("/invoice")
            }
          >
            Return to client login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="glowstone-portal-page">
      <header className="glowstone-portal-topbar">
        <a
          href="#/"
          className="glowstone-portal-brand"
        >
          <span className="glowstone-portal-brand-mark">
            <img
              src="/brand/glowstone-mark.png"
              alt=""
            />
          </span>

          <span>GLOWSTONEE</span>
        </a>

        <div className="glowstone-portal-topbar-right">
          <span>
            {project.clientName}
          </span>

          <button
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="glowstone-portal-progress">
        <div className="glowstone-portal-progress-head">
          <div>
            <span>PROJECT PROGRESS</span>
            <strong>
              {project.progress}%
            </strong>
          </div>

          <span>
            {project.status}
          </span>
        </div>

        <div className="glowstone-portal-progress-track">
          <div
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </section>

      <section className="glowstone-portal-hero">
        <div className="glowstone-portal-hero-copy">
          <span>
            {project.projectId}
          </span>

          <h1>
            {project.projectName}
          </h1>

          <p>
            {project.projectDescription ||
              "Your Glowstonee project workspace."}
          </p>

          <div className="glowstone-portal-stats">
            <div>
              <span>PROJECT VALUE</span>
              <strong>
                {formatINR(
                  project.projectFee,
                )}
              </strong>
            </div>

            <div>
              <span>PAID</span>
              <strong>
                {formatINR(
                  project.amountPaid,
                )}
              </strong>
            </div>

            <div>
              <span>BALANCE</span>
              <strong>
                {formatINR(
                  project.balanceDue,
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="glowstone-portal-preview-section">
        <div className="glowstone-section-heading">
          <span>LIVE PREVIEW</span>

          <div>
            <h2>
              Your website,
              <br />
              as it evolves.
            </h2>

            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open live website ↗
              </a>
            )}
          </div>
        </div>

        <div className="glowstone-laptop-preview">
          <div className="glowstone-laptop-preview-screen">
            <div className="glowstone-browser-bar">
              <div className="glowstone-browser-dots">
                <i />
                <i />
                <i />
              </div>

              <span>
                {project.websiteUrl ||
                  "Project preview"}
              </span>
            </div>

            {project.websiteUrl ? (
              <iframe
                src={project.websiteUrl}
                title="Project website preview"
                loading="lazy"
                allow="fullscreen"
              />
            ) : (
              <div className="glowstone-preview-empty">
                <span>
                  Website preview
                </span>

                <p>
                  Your website preview
                  will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="glowstone-laptop-preview-base" />
        </div>
      </section>

      <section className="glowstone-deliverables-section">
        <div className="glowstone-section-heading">
          <span>DELIVERABLES</span>

          <h2>
            What we’re
            <br />
            building.
          </h2>
        </div>

        <div className="glowstone-deliverables-list">
          {deliverables.map(
            (item, index) => (
              <div
                key={item.id}
                className="glowstone-deliverable"
              >
                <div className="glowstone-deliverable-number">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </div>

                <div className="glowstone-deliverable-main">
                  <div>
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>
                  </div>

                  <div className="glowstone-deliverable-meta">
                    <span>
                      {item.status}
                    </span>

                    <strong>
                      {item.progress}%
                    </strong>
                  </div>
                </div>

                <div className="glowstone-deliverable-track">
                  <div
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="glowstone-payment-section">
        <div className="glowstone-payment-header">
          <span>PAYMENT</span>

          <h2>
            Keep the
            <br />
            project moving.
          </h2>

          <p>
            Choose exactly how much you’d
            like to pay through Razorpay.
          </p>
        </div>

        <div className="glowstone-payment-card">
          <div className="glowstone-payment-card-top">
            <div>
              <span>REMAINING BALANCE</span>

              <strong>
                {formatINR(
                  project.balanceDue,
                )}
              </strong>
            </div>

            <div className="glowstone-payment-paid">
              <span>
                {paymentPercentage}% paid
              </span>
            </div>
          </div>

          {project.balanceDue > 0 ? (
            <>
              <div className="glowstone-payment-slider-wrap">
                <div className="glowstone-payment-slider-values">
                  <span>
                    {formatINR(
                      minimumPayment,
                    )}
                  </span>

                  <strong>
                    {formatINR(
                      paymentAmount,
                    )}
                  </strong>

                  <span>
                    {formatINR(
                      maximumPayment,
                    )}
                  </span>
                </div>

                <input
                  type="range"
                  min={minimumPayment}
                  max={maximumPayment}
                  step={500}
                  value={Math.min(
                    paymentAmount,
                    maximumPayment,
                  )}
                  onChange={(event) =>
                    setPaymentAmount(
                      Number(
                        event.target.value,
                      ),
                    )
                  }
                />
              </div>

              <button
                className="glowstone-pay-button"
                onClick={handlePayment}
                disabled={paying}
              >
                <span>
                  {paying
                    ? "Opening Razorpay..."
                    : `Pay ${formatINR(
                        paymentAmount,
                      )}`}
                </span>

                <span>↗</span>
              </button>

              {paymentError && (
                <div className="glowstone-payment-error">
                  {paymentError}
                </div>
              )}

              <p className="glowstone-payment-note">
                Secure payment powered by
                Razorpay. Minimum payment
                starts at ₹2,000.
              </p>
            </>
          ) : (
            <div className="glowstone-paid-complete">
              Project payments are complete.
            </div>
          )}
        </div>
      </section>

      <section className="glowstone-payment-history">
        <div className="glowstone-section-heading">
          <span>PAYMENT HISTORY</span>

          <h2>
            Everything
            <br />
            accounted for.
          </h2>
        </div>

        <div className="glowstone-payment-history-list">
          {payments.length === 0 ? (
            <div className="glowstone-payment-history-empty">
              No payments recorded yet.
            </div>
          ) : (
            payments.map(
              (payment) => (
                <div
                  key={payment.id}
                  className="glowstone-payment-history-row"
                >
                  <div>
                    <span>
                      {new Date(
                        payment.createdAt,
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>

                    <strong>
                      {payment.id}
                    </strong>
                  </div>

                  <span>
                    {payment.method ||
                      "Razorpay"}
                  </span>

                  <strong>
                    {formatINR(
                      payment.amount,
                    )}
                  </strong>
                </div>
              ),
            )
          )}
        </div>
      </section>

      <footer className="glowstone-portal-footer">
        <div>
          <span>
            Thank you for trusting Glowstonee.
          </span>

          <strong>
            Creative work for real impact.
          </strong>
        </div>

        <span>
          Glowstonee Creative Technology Studio
          · India
        </span>
      </footer>
    </main>
  );
}
