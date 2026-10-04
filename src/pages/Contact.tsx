import { FormEvent, useState } from "react";

const services = [
  "Branding & Identity",
  "Website",
  "Web Application",
  "Mobile / Desktop App",
  "Game / Interactive Experience",
  "Social Media",
  "Creative / Design",
  "Something else",
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="glowstone-contact-page">
      <section className="glowstone-contact-section">
        <div className="glowstone-contact-header">
          <span>Contact us</span>
          <h1>Let’s make<br />something great.</h1>
          <p>
            Tell us what you’re building, what you need, or simply
            what you have in mind.
          </p>
        </div>

        <form className="glowstone-contact-form" onSubmit={handleSubmit}>
          <div className="glowstone-form-row">
            <label>
              First name
              <input
                name="firstName"
                type="text"
                placeholder="Your first name"
                required
              />
            </label>

            <label>
              Last name
              <input
                name="lastName"
                type="text"
                placeholder="Your last name"
                required
              />
            </label>
          </div>

          <label>
            Work email
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
          </label>

          <label>
            Phone number
            <div className="glowstone-phone">
              <span>+91</span>
              <input
                name="phone"
                type="tel"
                placeholder="98765 43210"
              />
            </div>
          </label>

          <label>
            What can we help you with?
            <select name="service" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tell us about your project
            <textarea
              name="message"
              rows={6}
              placeholder="A little about your project, goals, timeline..."
              required
            />
          </label>

          <label className="glowstone-checkbox">
            <input type="checkbox" required />
            <span>
              I agree to Glowstone contacting me about this enquiry.
            </span>
          </label>

          <button type="submit" className="glowstone-submit">
            <span>{sent ? "Message sent" : "Send enquiry"}</span>
            <span>↗</span>
          </button>
        </form>
      </section>
    </main>
  );
}
