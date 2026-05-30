import { motion } from 'framer-motion';
import { ZONES } from '../data/zones';

interface ZoneGridProps {
  onEnterZone: (id: number) => void;
  /** When true, cards animate from dim → fully lit with staggered glow */
  isPoweringUp: boolean;
  /** Called when the last card finishes its power-up animation */
  onPowerUpComplete?: () => void;
}

const ZONE_IDS = [1, 2, 3, 4, 5] as const;

/* ── Framer Motion variants ────────────────────────────────
   dormant : cards are dim, no glow — the "unpowered grid" state
   powerUp : full opacity + colour glow, applied per-card with a
             custom delay derived from the card's index prop
──────────────────────────────────────────────────────────── */
const cardVariants = {
  dormant: {
    opacity: 0.3,
    filter: 'brightness(0.55) saturate(0.4)',
  },
  powerUp: {
    opacity: 1,
    filter: 'brightness(1) saturate(1)',
  },
};

export default function ZoneGrid({
  onEnterZone,
  isPoweringUp,
  onPowerUpComplete,
}: ZoneGridProps) {
  const lastIdx = ZONE_IDS.length - 1;

  return (
    <div id="zone-section">
      <div className="zone-section-header">
        <h2>SELECT YOUR PATH</h2>
        <p>Explore different zones of my journey.</p>
      </div>

      <div className="zone-grid" id="zone-grid">
        {ZONE_IDS.map((id, index) => {
          const zone      = ZONES[id];
          const isLast    = index === lastIdx;

          return (
            <motion.div
              key={id}
              className="zone-card"
              style={{
                ['--zone-col' as string]: zone.color,
                backgroundImage: `url('${zone.bg}')`,
              }}
              data-zone-id={id}
              data-zone-key={zone.key}
              /* ── Framer Motion ── */
              variants={cardVariants}
              initial="dormant"
              animate={isPoweringUp ? 'powerUp' : 'dormant'}
              transition={{
                delay:    index * 0.15,
                duration: 0.5,
                ease:     'easeOut',
              }}
              /* Only the last card signals completion */
              onAnimationComplete={
                isLast && isPoweringUp ? onPowerUpComplete : undefined
              }
              onClick={() => onEnterZone(id)}
            >
              <span className="zone-badge">LEVEL {id}</span>
              <h3 className="zone-title">{zone.name}</h3>
              <p className="zone-desc">{zone.projects[0]?.desc ?? ''}</p>
              <button
                className="zone-enter-btn"
                style={{ ['--zone-col' as string]: zone.color }}
                onClick={e => {
                  e.stopPropagation();
                  onEnterZone(id);
                }}
              >
                ENTER ZONE →
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
