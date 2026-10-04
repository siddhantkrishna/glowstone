export default function Navigation() {
  return (
    <nav className="fixed left-1/2 top-3 z-[9999] -translate-x-1/2">
      <div className="flex h-12 w-max items-center gap-1 rounded-full border border-black/10 bg-white/90 px-2 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl">

        <a
          href="#/"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white"
        >
          G
        </a>

        <div className="mx-1 h-5 w-px bg-black/15" />

        <div className="hidden items-center gap-1 md:flex">
          <a
            href="#/work"
            className="rounded-full bg-black px-3 py-1.5 text-[11px] font-medium text-white"
          >
            Work
          </a>

          <a
            href="#/services"
            className="rounded-full px-3 py-1.5 text-[11px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
          >
            Services
          </a>

          <a
            href="#/about"
            className="rounded-full px-3 py-1.5 text-[11px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
          >
            About
          </a>

          <a
            href="#/journal"
            className="rounded-full px-3 py-1.5 text-[11px] font-medium text-black/60 transition-colors hover:bg-black/5 hover:text-black"
          >
            Journal
          </a>
        </div>

        <a
          href="#/contact"
          className="ml-1 rounded-full bg-[#0a0a0a] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02]"
        >
          Start a project
        </a>

      </div>
    </nav>
  );
}
