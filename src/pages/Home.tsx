const tools = [
  { name: "Claude Code", color: "claude" },
  { name: "Vercel", color: "vercel" },
  { name: "Framer", color: "framer" },
  { name: "Lovable", color: "lovable" },
  { name: "Supabase", color: "supabase" },
  { name: "Cursor", color: "cursor" },
  { name: "OpenAI", color: "openai" },
  { name: "Google", color: "google" },
  { name: "Antigravity", color: "antigravity" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f1] text-[#0a0a0a]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">

        {/* Laptop */}
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
