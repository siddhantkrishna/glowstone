import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const Home = lazy(() => import("@/pages/Home"));
const Work = lazy(() => import("@/pages/Work"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Journal = lazy(() => import("@/pages/Journal"));
const Article = lazy(() => import("@/pages/Article"));
const Contact = lazy(() => import("@/pages/Contact"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Current page fades/slides slightly away; next page rises in. ~450ms. */
function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, transition: { duration: 0.28, ease: [0.65, 0, 0.35, 1] } }}
    >
      {children}
    </motion.div>
  );
}

function HashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 700);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);
  return null;
}

function Shell() {
  const location = useLocation();
  const isContact = location.pathname.startsWith("/contact");

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
        Skip to content
      </a>
      <Navigation />
      <HashScroll />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <PageTransition key={location.pathname}>
          <main id="main" tabIndex={-1} className="outline-none">
            <Suspense fallback={<div className="min-h-svh" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:slug" element={<Article />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal/:slug" element={<Legal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer showCta={!isContact} />
        </PageTransition>
      </AnimatePresence>
      <Loader />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
