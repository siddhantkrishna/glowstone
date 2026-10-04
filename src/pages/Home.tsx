export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="glowstone-clean-hero">
        <div className="glowstone-hero-light" />

        <div className="glowstone-clean-laptop">
          <div className="glowstone-clean-screen">
            <div className="glowstone-clean-notch" />

            <video
              className="glowstone-clean-video"
              src="/glowstone-screen.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="glowstone-clean-keyboard" />
        </div>
      </section>
    </main>
  );
}
