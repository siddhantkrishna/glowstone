import {
  SiAnthropic,
  SiVercel,
  SiFramer,
  SiSupabase,
  SiCursor,
  SiGoogle,
} from "@icons-pack/react-simple-icons";

const tools = [
  { name: "Claude Code", icon: SiAnthropic },
  { name: "Vercel", icon: SiVercel },
  { name: "Framer", icon: SiFramer },
  { name: "Lovable", icon: null },
  { name: "Supabase", icon: SiSupabase },
  { name: "Cursor", icon: SiCursor },
  { name: "OpenAI", icon: null },
  { name: "Google", icon: SiGoogle },
  { name: "Antigravity", icon: null },
];

function ToolItem({
  name,
  icon: Icon,
}: {
  name: string;
  icon: typeof SiVercel | null;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-8 text-black/55">
      {Icon ? (
        <Icon size={20} title={name} />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/30 text-[8px] font-semibold">
          A
        </span>
      )}

      <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.01em]">
        {name}
      </span>
    </div>
  );
}

export default function Home() {
  const repeatedTools = [...tools, ...tools, ...tools];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-16">

        <div className="w-[min(1200px,88vw)]">

          {/* MacBook */}
          <div className="relative">

            {/* Display */}
            <div className="relative z-10 overflow-hidden rounded-[24px] border border-black/20 bg-[#151515] p-[9px] shadow-[0_40px_90px_rgba(0,0,0,0.22)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[17px] bg-white">

                {/* macOS controls */}
                <div className="absolute left-5 top-5 z-30 flex gap-[7px]">
                  <span className="h-[12px] w-[12px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[12px] w-[12px] rounded-full bg-[#febc2e]" />
                  <span className="h-[12px] w-[12px] rounded-full bg-[#28c840]" />
                </div>

                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-40 h-[30px] w-[170px] -translate-x-1/2 rounded-b-[19px] bg-[#151515]">
                  <div className="absolute left-1/2 top-[8px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#252525]" />
                </div>

                {/* Empty screen */}
                <div className="absolute inset-0 bg-white" />
              </div>
            </div>

            {/* Hinge */}
            <div className="relative z-20 mx-auto h-[10px] w-[82%] bg-gradient-to-b from-[#bdbdbd] to-[#dcdcdc]" />

            {/* Keyboard */}
            <div className="relative z-20 mx-auto -mt-[1px] w-[94%] rounded-b-[28px] bg-gradient-to-b from-[#dedede] via-[#c9c9c9] to-[#a8a8a8] px-[5%] pb-[18px] pt-[12px] shadow-[0_22px_35px_rgba(0,0,0,0.18)]">
              <div className="rounded-[10px] bg-[#b7b7b7] p-[8px] shadow-inner">
                <div className="grid grid-cols-15 gap-[4px]">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-[14px] rounded-[3px] bg-[#707070]"
                    />
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-4 h-[42px] w-[30%] rounded-[6px] border border-black/10 bg-[#cfcfcf]" />
            </div>

            {/* Front lip */}
            <div className="relative z-30 mx-auto h-[9px] w-[97%] rounded-b-[50%] bg-gradient-to-b from-[#c4c4c4] to-[#999999]" />

            <div className="mx-auto mt-3 h-5 w-[65%] rounded-full bg-black/10 blur-2xl" />
          </div>

          {/* Tools label */}
          <div className="mt-14 text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/40">
              Tools we use
            </span>
          </div>

          {/* Tools ribbon */}
          <div className="relative mt-6 overflow-hidden border-y border-black/10 py-5">

            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5f4f1] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5f4f1] to-transparent" />

            <div className="tools-marquee flex w-max">
              {repeatedTools.map((tool, index) => (
                <ToolItem
                  key={`${tool.name}-${index}`}
                  name={tool.name}
                  icon={tool.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
