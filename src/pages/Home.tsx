export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24">
        <div className="mb-16 text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-black/45">
            Glowstone
          </p>

          <h1 className="max-w-5xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.065em]">
            Creative technology,
            <br />
            built differently.
          </h1>
        </div>

        <div className="relative w-[min(1400px,96vw)]">
          {/* MacBook display */}
          <div className="relative mx-auto w-full">
            <div className="relative overflow-hidden rounded-[2.2%] border border-black/20 bg-[#050505] p-[1.05%] shadow-[0_45px_100px_rgba(0,0,0,0.22),0_12px_30px_rgba(0,0,0,0.12)]">
              {/* Screen bezel */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4%] bg-white">
                {/* Empty screen */}
                <div className="absolute inset-0 bg-white" />

                {/* Camera */}
                <div className="absolute left-1/2 top-[1.1%] z-10 h-[1.1%] w-[10%] -translate-x-1/2 rounded-full bg-[#050505]" />
              </div>
            </div>

            {/* MacBook hinge/base */}
            <div className="relative mx-auto h-[14px] w-[86%] rounded-b-[50%] bg-gradient-to-b from-[#c9c9c9] via-[#e6e6e6] to-[#a9a9a9] shadow-[0_12px_20px_rgba(0,0,0,0.14)]">
              <div className="absolute left-1/2 top-0 h-[3px] w-[12%] -translate-x-1/2 rounded-b-full bg-black/15" />
            </div>

            {/* Desk reflection */}
            <div className="mx-auto mt-1 h-[18px] w-[72%] rounded-[50%] bg-black/10 blur-xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
