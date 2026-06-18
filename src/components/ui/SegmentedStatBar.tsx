/**
 * SegmentedStatBar
 *
 * Shared pixel-art segmented stat bar used in:
 *  - StatsPanel (home screen sidebar) — classPrefix="stat", uses colorClass
 *  - CodeCaveZone (RPG panel)         — classPrefix="ps-stat", uses inline color
 *
 * Props:
 *  icon        — FontAwesome icon class (without 'fa-solid ', e.g. 'fa-brain')
 *  label       — text label
 *  value       — 0-100 numeric
 *  segments    — total number of bar segments
 *  classPrefix — CSS namespace (e.g. 'stat' → .stat-row, .stat-track, etc.)
 *  colorClass  — optional CSS class applied to the label (StatsPanel style)
 *  color       — optional inline color string applied to icon + label (CodeCave style)
 */
export interface SegmentedStatBarProps {
  icon: string;
  label: string;
  value: number;
  segments: number;
  classPrefix: string;
  colorClass?: string;
  color?: string;
}

export function SegmentedStatBar({
  icon,
  label,
  value,
  segments,
  classPrefix,
  colorClass,
  color,
}: SegmentedStatBarProps) {
  const filled = Math.round((value / 100) * segments);

  return (
    <div className={`${classPrefix}-row`}>
      <i
        className={`fa-solid ${icon} ${classPrefix}-icon`}
        style={color ? { color } : undefined}
      />
      <span
        className={`${classPrefix}-label${colorClass ? ` ${colorClass}` : ''}`}
        style={color ? { color } : undefined}
      >
        {label}
      </span>
      <div className={`${classPrefix}-track`}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`${classPrefix}-seg${!color && i >= filled ? ' empty' : ''}`}
            style={color && i < filled
              ? { background: '#FFD700', boxShadow: '0 0 3px #FFD70077' }
              : undefined
            }
          />
        ))}
      </div>
      <span className={`${classPrefix}-val`}>{value}</span>
    </div>
  );
}
