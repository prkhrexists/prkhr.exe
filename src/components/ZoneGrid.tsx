import { motion } from 'framer-motion';
import { ZONES } from '../data/zones';

interface ZoneGridProps {
  onEnterZone: (id: number) => void;
}

const ZONE_IDS = [1, 2, 3, 4, 5] as const;

function getZoneHint(id: number) {
  switch (id) {
    case 1: return "Neural pathways & logic vectors.";
    case 2: return "Archived execution payloads.";
    case 3: return "Classified R&D sector.";
    case 4: return "Corporate ops & ventures.";
    case 5: return "Combat records & accolades.";
    default: return "Unknown sector.";
  }
}

export default function ZoneGrid({
  onEnterZone,
}: ZoneGridProps) {

  return (
    <div id="zone-section">
      <div className="zone-section-header">
        <h2>SELECT YOUR PATH</h2>
        <p>Explore different zones of my journey.</p>
      </div>

      <div className="zone-grid" id="zone-grid">
        {ZONE_IDS.map((id, index) => {
          const zone = ZONES[id];

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
              }}
              onClick={() => onEnterZone(id)}
            >
              <span className="zone-badge">LEVEL {id}</span>
              <h3 className="zone-title">{zone.name}</h3>
              <p className="zone-hint">{getZoneHint(id)}</p>
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
