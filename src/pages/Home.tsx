export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="relative w-[min(1800px,98vw)]">
          {/* MacBook screen */}
          <div className="relative overflow-hidden rounded-[28px] border border-black/20 bg-[#171717] p-[10px] shadow-[0_50px_120px_rgba(0,0,0,0.28)]">
            {/* Screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[19px] bg-white">
              {/* macOS-style window controls */}
              <div className="absolute left-6 top-5 z-20 flex items-center gap-2">
                <span className="h-[13px] w-[13px] rounded-full bg-[#ff5f57]" />
                <span className="h-[13px] w-[13px] rounded-full bg-[#febc2e]" />
                <span className="h-[13px] w-[13px] rounded-full bg-[#28c840]" />
              </div>

              {/* Camera notch */}
              <div className="absolute left-1/2 top-0 z-30 h-[34px] w-[190px] -translate-x-1/2 rounded-b-[22px] bg-[#171717]">
                <div className="absolute left-1/2 top-[9px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[#252525]" />
              </div>

              {/* Empty screen */}
              <div className="absolute inset-0 bg-white" />
            </div>
          </div>

          {/* MacBook lower edge */}
          <div className="mx-auto h-[18px] w-[88%] rounded-b-[50%] bg-gradient-to-b from-[#d7d7d7] to-[#a9a9a9] shadow-[0_15px_30px_rgba(0,0,0,0.18)]" />

          {/* Subtle reflection */}
          <div className="mx-auto mt-2 h-5 w-[65%] rounded-[50%] bg-black/10 blur-2xl" />
        </div>
      </section>
    </main>
  )
}
