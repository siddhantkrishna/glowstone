export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="relative w-[min(1200px,88vw)]">

          {/* Display */}
          <div className="relative z-10 overflow-hidden rounded-[24px] border border-black/20 bg-[#151515] p-[9px] shadow-[0_40px_90px_rgba(0,0,0,0.22)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[17px] bg-white">

              {/* macOS window controls */}
              <div className="absolute left-5 top-5 z-30 flex gap-[7px]">
                <span className="h-[12px] w-[12px] rounded-full bg-[#ff5f57]" />
                <span className="h-[12px] w-[12px] rounded-full bg-[#febc2e]" />
                <span className="h-[12px] w-[12px] rounded-full bg-[#28c840]" />
              </div>

              {/* Camera notch */}
              <div className="absolute left-1/2 top-0 z-40 h-[30px] w-[170px] -translate-x-1/2 rounded-b-[19px] bg-[#151515]">
                <div className="absolute left-1/2 top-[8px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#252525]" />
              </div>

              {/* Empty display */}
              <div className="absolute inset-0 bg-white" />
            </div>
          </div>

          {/* Display hinge */}
          <div className="relative z-20 mx-auto h-[10px] w-[82%] bg-gradient-to-b from-[#bdbdbd] to-[#dcdcdc]" />

          {/* Keyboard deck */}
          <div className="relative z-20 mx-auto -mt-[1px] w-[94%] rounded-b-[28px] bg-gradient-to-b from-[#dedede] via-[#c9c9c9] to-[#a8a8a8] px-[5%] pb-[18px] pt-[12px] shadow-[0_22px_35px_rgba(0,0,0,0.18)]">

            {/* Keyboard */}
            <div className="rounded-[10px] bg-[#b7b7b7] p-[8px] shadow-inner">
              <div className="grid grid-cols-15 gap-[4px]">

                {/* Row 1 */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <span
                    key={`r1-${i}`}
                    className="h-[12px] rounded-[3px] bg-[#6f6f6f]"
                  />
                ))}

                {/* Row 2 */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <span
                    key={`r2-${i}`}
                    className="h-[15px] rounded-[3px] bg-[#737373]"
                  />
                ))}

                {/* Row 3 */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <span
                    key={`r3-${i}`}
                    className="h-[15px] rounded-[3px] bg-[#737373]"
                  />
                ))}

                {/* Row 4 */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <span
                    key={`r4-${i}`}
                    className="h-[15px] rounded-[3px] bg-[#737373]"
                  />
                ))}

                {/* Row 5 */}
                <span className="col-span-2 h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="col-span-7 h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="h-[15px] rounded-[3px] bg-[#737373]" />
                <span className="h-[15px] rounded-[3px] bg-[#737373]" />
              </div>
            </div>

            {/* Trackpad */}
            <div className="mx-auto mt-4 h-[42px] w-[30%] rounded-[6px] border border-black/10 bg-[#cfcfcf]" />
          </div>

          {/* Front lip */}
          <div className="relative z-30 mx-auto h-[9px] w-[97%] rounded-b-[50%] bg-gradient-to-b from-[#c4c4c4] to-[#999999]" />

          {/* Reflection */}
          <div className="mx-auto mt-3 h-5 w-[65%] rounded-full bg-black/10 blur-2xl" />
        </div>
      </section>
    </main>
  );
}
