const tools = [
  "Claude Code",
  "Vercel",
  "Framer",
  "Lovable",
  "Supabase",
  "Cursor",
  "OpenAI",
  "Google",
  "Antigravity",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">

        {/* Laptop */}
        <div className="glowstone-laptop">
          <div className="glowstone-screen">
            <div className="glowstone-notch" />
            <div className="glowstone-screen-content" />
          </div>

          <div className="glowstone-keyboard" />
        </div>

        {/* Tools */}
        <div className="mt-10 w-full max-w-[1100px]">
          <div className="mb-5 text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/40">
              Tools we use
            </span>
          </div>

          <div className="glowstone-tools">
            <div className="glowstone-tools-track">
              {[...tools, ...tools, ...tools].map((tool, index) => (
                <div
                  key={`${tool}-${index}`}
                  className="glowstone-tool"
                >
                  <span className="glowstone-tool-mark">
                    {tool.charAt(0)}
                  </span>
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
