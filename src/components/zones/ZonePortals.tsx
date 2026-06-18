import { motion, type MotionValue, useTransform } from 'framer-motion';
import { ZONES } from '../../data/zones';

interface ZonePortalsProps {
  scrollProgress: MotionValue<number>;
  onEnterZone: (id: number) => void;
}

const PORTALS = [1, 2, 3, 4, 5] as const;

function PortalWireframe({ zoneId, scrollProgress }: { zoneId: number; scrollProgress: MotionValue<number> }) {
  const spin = useTransform(scrollProgress, v => `${(v * 720 + zoneId * 54) % 360}deg`);
  const pulse = useTransform(scrollProgress, [0, 0.5, 1], [0.86, 1, 1.16]);

  return (
    <motion.div className={`portal-wire portal-wire-${zoneId}`} style={{ rotate: spin, scale: pulse }}>
      <span className="wire-ring" />
      <span className="wire-core" />
    </motion.div>
  );
}

function PortalCard({
  id,
  index,
  scrollProgress,
  onEnterZone,
}: {
  id: number;
  index: number;
  scrollProgress: MotionValue<number>;
  onEnterZone: (id: number) => void;
}) {
  const zone = ZONES[id];

  const rotateY = useTransform(scrollProgress, v => `${(v * 110) - (index * 16)}deg`);
  const rotateZ = useTransform(scrollProgress, [0, 1], [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 7 : -7]);
  const x = useTransform(scrollProgress, [0, 1], [0, index * 18]);
  const y = useTransform(scrollProgress, [0, 1], [index * 18, -index * 14]);
  const depth = useTransform(scrollProgress, [0, 1], [index * -34, index * 38]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 1], [0.28, 0.75, 1]);

  return (
    <motion.button
      type="button"
      className="zone-portal"
      style={{
        borderColor: zone.color,
        boxShadow: `0 0 0 1px ${zone.color}55, 0 0 28px ${zone.color}22`,
        x,
        y,
        rotateY,
        rotateZ,
        z: depth,
        opacity,
      }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      onClick={() => onEnterZone(id)}
    >
      <span className="portal-sheen" />
      <span className="portal-label">
        <strong>LEVEL {id}</strong>
        <span>{zone.name}</span>
      </span>
      <PortalWireframe zoneId={id} scrollProgress={scrollProgress} />
      <span className="portal-orbit" aria-hidden="true" />
    </motion.button>
  );
}

export default function ZonePortals({ scrollProgress, onEnterZone }: ZonePortalsProps) {
  const carouselY = useTransform(scrollProgress, [0, 1], [0, -64]);
  const carouselRotate = useTransform(scrollProgress, v => `${(v * 18) - 9}deg`);

  return (
    <section className="zone-portal-stack" aria-label="Zone portals">
      <div className="zone-portal-copy">
        <h2>ZONE PORTALS</h2>
        <p>Scroll to rotate through destinations.</p>
      </div>
      <motion.div className="zone-portal-carousel" style={{ y: carouselY, rotateX: carouselRotate }}>
        {PORTALS.map((id, index) => (
          <PortalCard
            key={id}
            id={id}
            index={index}
            scrollProgress={scrollProgress}
            onEnterZone={onEnterZone}
          />
        ))}
      </motion.div>
    </section>
  );
}
