/**
 * SegmentedXpBar
 *
 * A shared pixel-art segmented XP bar used in both:
 *  - StatsPanel (home map sidebar) — classPrefix="xp"  (CSS: .xp-track, .xp-fill)
 *  - CodeCaveZone (RPG panel)      — classPrefix="ps-xp" (CSS: .ps-xp-track, .ps-xp-seg)
 *
 * Props:
 *  current     — current XP value
 *  max         — max XP value
 *  segments    — number of discrete bar segments
 *  classPrefix — CSS class namespace for this instance
 *  showLabel   — whether to render "XP" label and "current / max XP" text
 */
export interface SegmentedXpBarProps {
  current: number;
  max: number;
  segments: number;
  classPrefix: string;
  showLabel?: boolean;
}

export function SegmentedXpBar({
  current,
  max,
  segments,
  classPrefix,
  showLabel = true,
}: SegmentedXpBarProps) {
  const filled = Math.round((current / max) * segments);

  return (
    <div className={`${classPrefix}-wrap`}>
      <div className={`${classPrefix}-row`}>
        {showLabel && <span className={`${classPrefix}-label`}>XP</span>}
        <div className={`${classPrefix}-track`}>
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`${classPrefix}-seg${i < filled ? ' filled' : ''}`}
            />
          ))}
        </div>
        {showLabel && (
          <span className={`${classPrefix}-nums`}>
            {current} / {max} XP
          </span>
        )}
      </div>
    </div>
  );
}
