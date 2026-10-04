export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="glowstone-clean-hero">
        <div className="glowstone-hero-light" />

        <div className="glowstone-clean-laptop">
          <div className="glowstone-clean-screen">
            <div className="glowstone-clean-notch" />

            <video
              className="glowstone-clean-video"
              src="/glowstone-screen.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="glowstone-clean-keyboard" />
        </div>
      </section>
    </main>
  );
}


/* ============================================================
   CLEAN HERO — OVERRIDES ALL PREVIOUS GLOWSTONE HERO CSS
   ============================================================ */

.glowstone-clean-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
}

.glowstone-clean-hero .glowstone-hero-light {
  position: absolute !important;
  inset: -20% !important;
  z-index: 0 !important;
  pointer-events: none !important;
  opacity: 1 !important;

  background:
    radial-gradient(
      circle at 25% 40%,
      rgba(255, 190, 220, 0.42),
      transparent 48%
    ),
    radial-gradient(
      circle at 75% 35%,
      rgba(210, 190, 255, 0.42),
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 85%,
      rgba(240, 215, 255, 0.30),
      transparent 48%
    );

  filter: blur(55px);

  animation: glowstone-clean-light 18s ease-in-out infinite alternate;
}

@keyframes glowstone-clean-light {
  0% {
    transform: translate3d(-5%, -3%, 0) scale(1);
  }

  50% {
    transform: translate3d(6%, 4%, 0) scale(1.08);
  }

  100% {
    transform: translate3d(-3%, 2%, 0) scale(1.04);
  }
}


/* ============================================================
   LARGE LAPTOP
   ============================================================ */

.glowstone-clean-laptop {
  position: relative !important;
  z-index: 10 !important;

  width: 620px !important;
  height: 370px !important;

  flex: 0 0 620px !important;

  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;

  transform: scale(1.85) !important;
  transform-origin: center center !important;

  visibility: visible !important;
  opacity: 1 !important;
}


/* ============================================================
   SCREEN
   ============================================================ */

.glowstone-clean-screen {
  position: relative !important;

  width: 518px !important;
  height: 318px !important;

  padding: 9px 9px 23px !important;

  overflow: hidden !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  background: #000 !important;

  border-radius: 20px !important;

  box-shadow:
    inset 0 0 0 2px #c8cacb,
    inset 0 0 0 10px #000 !important;

  transform-style: preserve-3d !important;
  transform-origin: 50% 100% !important;

  animation:
    glowstone-clean-open
    2.8s
    cubic-bezier(0.16, 1, 0.3, 1)
    1
    normal
    forwards !important;
}

@keyframes glowstone-clean-open {
  from {
    transform:
      perspective(1900px)
      rotateX(-88.5deg);
  }

  to {
    transform:
      perspective(1900px)
      rotateX(0deg);
  }
}


/* ============================================================
   VIDEO
   ============================================================ */

.glowstone-clean-video {
  position: absolute !important;
  inset: 9px !important;

  width: calc(100% - 18px) !important;
  height: calc(100% - 41px) !important;

  object-fit: cover !important;

  display: block !important;

  border: 0 !important;
  border-radius: 10px !important;

  background: #000 !important;

  z-index: 2 !important;
}


/* ============================================================
   NOTCH
   ============================================================ */

.glowstone-clean-notch {
  position: absolute !important;

  top: 10px !important;
  left: 50% !important;

  width: 100px !important;
  height: 12px !important;

  transform: translateX(-50%) !important;

  background: #000 !important;

  border-radius: 0 0 6px 6px !important;

  z-index: 10 !important;
}


/* ============================================================
   BOTTOM SCREEN BEZEL
   ============================================================ */

.glowstone-clean-screen::after {
  content: "" !important;

  position: absolute !important;

  left: 2px !important;
  bottom: 2px !important;

  width: 514px !important;
  height: 24px !important;

  background: linear-gradient(
    to bottom,
    #272727,
    #0d0d0d
  ) !important;

  border-radius: 0 0 20px 20px !important;

  z-index: 5 !important;
}


/* ============================================================
   KEYBOARD
   ============================================================ */

.glowstone-clean-keyboard {
  position: relative !important;

  width: 620px !important;
  height: 24px !important;

  margin-top: -10px !important;

  z-index: 20 !important;

  background:
    radial-gradient(
      circle at center,
      #e2e3e4 85%,
      #a9abac 100%
    ) !important;

  border: solid #a0a3a7 !important;
  border-width: 1px 2px 0 2px !important;

  border-radius: 2px 2px 12px 12px !important;

  box-shadow:
    inset 0 -2px 8px 0 #6c7074 !important;
}

.glowstone-clean-keyboard::after {
  content: "" !important;

  position: absolute !important;

  top: 0 !important;
  left: 50% !important;

  width: 120px !important;
  height: 10px !important;

  margin-left: -60px !important;

  background: #e2e3e4 !important;

  border-radius: 0 0 10px 10px !important;

  box-shadow:
    inset 0 0 4px 2px #babdbf !important;
}

.glowstone-clean-keyboard::before {
  content: "" !important;

  position: absolute !important;

  bottom: -2px !important;
  left: 50% !important;

  width: 40px !important;
  height: 2px !important;

  margin-left: -10px !important;

  background: transparent !important;

  box-shadow:
    -270px 0 #272727,
    250px 0 #272727 !important;
}


/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 700px) {
  .glowstone-clean-laptop {
    transform: scale(0.72) !important;
  }
}

@media (min-width: 1600px) {
  .glowstone-clean-laptop {
    transform: scale(2.05) !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glowstone-clean-hero .glowstone-hero-light {
    animation: none !important;
  }

  .glowstone-clean-screen {
    animation: none !important;
    transform:
      perspective(1900px)
      rotateX(0deg) !important;
  }
}
