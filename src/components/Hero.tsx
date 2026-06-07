interface HeroProps {
  /** Called when "EXPLORE WORLD" is clicked — parent handles navigation */
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {

  return (
    <>
      <section id="hero-center" aria-label="Hero introduction" style={{ position: 'relative' }}>
        {/* Scattered glitch block artifacts */}
        <div className="hero-glitch-artifact a1" aria-hidden="true" />
        <div className="hero-glitch-artifact a2" aria-hidden="true" />
        <div className="hero-glitch-artifact a3" aria-hidden="true" />
        <div className="hero-glitch-artifact a4" aria-hidden="true" />
        <div className="hero-glitch-artifact a5" aria-hidden="true" />

        <p className="hero-greeting">Hello, I'm</p>

        <h1 className="hero-title">
          <span className="glitch-wrap" data-text="PRAKHAR">PRAKHAR</span>
        </h1>

        <div className="hero-tagline">
          <p>
            Aspiring Software Engineer with a technical focus on Edge-AI deployment and hardware-software integration.
          </p>
        </div>

        <div className="hero-actions">
          {/* EXPLORE WORLD — triggers power-up sequence in parent */}
          <button
            className="btn btn-yellow"
            id="explore-btn"
            onClick={onExplore}
          >
            EXPLORE WORLD <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <p style={{ marginBottom: '4px' }}>SCROLL TO START JOURNEY</p>
          <i className="fa-solid fa-chevron-down" />
        </div>
      </section>
    </>
  );

}
