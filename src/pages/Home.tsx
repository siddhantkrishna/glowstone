export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0a0a0a]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">

        <div className="glowstone-hero-light" />

        <div className="relative z-20 flex items-center justify-center">

          <div className="glowstone-laptop">
            <div className="glowstone-screen">
              <div className="glowstone-notch" />

              <div className="glowstone-screen-content">
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
            </div>

            <div className="glowstone-keyboard" />
          </div>

        </div>
      </section>
    </main>
  );
}
