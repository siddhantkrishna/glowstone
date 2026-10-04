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
      </section>
    </main>
  );
}
