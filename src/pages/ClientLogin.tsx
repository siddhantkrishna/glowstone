import {
  FormEvent,
  useState,
} from "react";
import {
  useNavigate,
} from "react-router-dom";

export default function ClientLogin() {
  const navigate = useNavigate();

  const [projectId, setProjectId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/client/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            projectId,
            password,
          }),
        },
      );

      const raw = await response.text();

      let data: {
        error?: string;
        project?: {
          projectId?: string;
        };
      } = {};

      try {
        data = raw
          ? JSON.parse(raw)
          : {};
      } catch {
        data = {
          error:
            raw ||
            `Server returned HTTP ${response.status}.`,
        };
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Server returned HTTP ${response.status}.`,
        );
      }

      const authenticatedProjectId =
        data.project?.projectId;

      if (!authenticatedProjectId) {
        throw new Error(
          "Login succeeded, but the project information was missing.",
        );
      }

      navigate(
        `/client/${encodeURIComponent(
          authenticatedProjectId,
        )}`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="glowstone-client-login-page">
      <div className="glowstone-client-login-wrap">
        <div className="glowstone-client-login-brand">
          <div className="glowstone-client-login-mark">
            <img
              src="/brand/glowstone-mark.png"
              alt="Glowstonee"
            />
          </div>

          <span>GLOWSTONEE</span>
        </div>

        <section className="glowstone-client-login-card">
          <div className="glowstone-client-login-heading">
            <span>Client space</span>

            <h1>
              Your project,
              <br />
              in one place.
            </h1>

            <p>
              Enter the project credentials
              Glowstonee gave you.
            </p>
          </div>

          <form
            className="glowstone-client-login-form"
            onSubmit={handleSubmit}
          >
            <label>
              Project ID
              <input
                value={projectId}
                onChange={(event) =>
                  setProjectId(
                    event.target.value,
                  )
                }
                placeholder="e.g. AAGAZ-2026-027"
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password

              <div className="glowstone-password-wrap">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Your project password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value,
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <div className="glowstone-client-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="glowstone-client-login-submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Open project"}
              </span>

              <span>↗</span>
            </button>
          </form>

          <div className="glowstone-client-login-foot">
            <span>
              Powered by Glowstonee
            </span>

            <a href="#/">
              Back to studio
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
