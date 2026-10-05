export default function Home() {
  return (
    <main className="glowstone-page">
      <section className="glowstone-hero">
        <div className="glowstone-hero-light" />

        <div className="glowstone-laptop">
          <div className="glowstone-screen">
            <div className="glowstone-notch" />

            <video
              className="glowstone-screen-video"
              src="/glowstone-screen.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="glowstone-keyboard" />
        </div>

        <div className="glowstone-hero-actions">
          <a href="#/contact" className="glowstone-contact-button">
            <span>Contact us</span>
            <span className="glowstone-contact-arrow">↗</span>
          </a>

          <a href="#/invoice" className="glowstone-invoice-button">
            <span>Get invoice</span>
            <span className="glowstone-invoice-arrow">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
