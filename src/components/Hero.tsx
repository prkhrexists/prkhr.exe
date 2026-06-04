interface HeroProps {
  /** Called when "EXPLORE WORLD" is clicked — parent handles navigation */
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {

  return (
    <>
      <section id="hero-center" aria-label="Hero introduction">
        <p className="hero-greeting">Hello, I'm</p>

        <h1 className="hero-title">
          <span className="glitch-wrap" data-text="PRAKHAR">PRAKHAR</span>
        </h1>

        <div className="hero-tagline">
          <p>
            Writing code to solve problems, building hardware to interact with the
            world, and learning everything in between.
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
