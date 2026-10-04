export default function Footer() {
  return (
    <footer className="glowstone-footer">
      <div className="glowstone-footer-inner">

        <div className="glowstone-footer-top">
          <div className="glowstone-footer-brand">
            <img
              src="/brand/glowstone-wordmark.png"
              alt="Glowstone"
              className="glowstone-footer-logo"
            />

            <p className="glowstone-footer-tagline">
              Creative technology studio.
            </p>
          </div>

          <div className="glowstone-footer-links">
            <div className="glowstone-footer-column">
              <span className="glowstone-footer-label">Studio</span>
              <a href="#about">About</a>
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
            </div>

            <div className="glowstone-footer-column">
              <span className="glowstone-footer-label">Connect</span>
              <a href="#/contact">Contact</a>
              <a href="mailto:hello@glowstone.studio">Email</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>

            <div className="glowstone-footer-column">
              <span className="glowstone-footer-label">Services</span>
              <a href="#branding">Branding</a>
              <a href="#websites">Websites</a>
              <a href="#apps">Apps</a>
              <a href="#creative">Creative</a>
            </div>
          </div>
        </div>

        <div className="glowstone-footer-rule" />

        <div className="glowstone-footer-bottom">
          <span>© {new Date().getFullYear()} Glowstone.</span>
          <span>Mumbai, India</span>

          <div className="glowstone-footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
