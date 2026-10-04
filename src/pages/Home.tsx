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
    <main className="min-h-screen overflow-hidden bg-white text-[#0a0a0a]">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">

        <div className="glowstone-hero-light" />

        <div className="relative z-20 flex flex-col items-center">

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

          <div className="mt-10 w-full">
            <div className="glowstone-tools-label">
              Tools we use
            </div>

            <div className="glowstone-tools">
              <div className="glowstone-tools-track">
                {[...tools, ...tools, ...tools].map((tool, index) => (
                  <div
                    key={`${tool.name}-${index}`}
                    className={`glowstone-tool glowstone-tool-${tool.color}`}
                  >
                    <span className="glowstone-tool-mark">
                      {tool.name.charAt(0)}
                    </span>

                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
