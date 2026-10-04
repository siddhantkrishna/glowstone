import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Journal", path: "/journal" },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed left-1/2 top-3 z-50 -translate-x-1/2">
      <div className="flex h-12 w-max items-center gap-1 rounded-full border border-black/[0.08] bg-white/75 px-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">

        <Link
          to="/"
          aria-label="Glowstone home"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[9px] font-semibold tracking-[-0.04em] text-white transition-transform duration-200 hover:scale-105"
        >
          G
        </Link>

        <div className="mx-1 h-5 w-px bg-black/10" />

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const active =
              location.pathname === link.path ||
              location.pathname.startsWith(`${link.path}/`);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={[
                  "rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200",
                  active
                    ? "bg-black text-white"
                    : "text-black/60 hover:bg-black/[0.06] hover:text-black",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          to="/contact"
          className="ml-1 rounded-full bg-[#0a0a0a] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02]"
        >
          Start a project
        </Link>

      </div>
    </nav>
  );
}
