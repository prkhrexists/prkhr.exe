import type { InventoryItem } from '../types';

const ALL_ITEMS: InventoryItem[] = [
  { icon: 'fa-laptop-code', label: 'Code',     active: true  },
  { icon: 'fa-helicopter',  label: 'Drone',    active: false },
  { icon: 'fa-dumbbell',    label: 'Strength', active: true  },
  { icon: 'fa-trophy',      label: 'Trophy',   active: false },
  { icon: 'fa-rocket',      label: 'Rocket',   active: false },
];

// Only render items that are active — remove empty placeholder boxes
const ACTIVE_ITEMS = ALL_ITEMS.filter(item => item.active);

export default function Inventory() {
  return (
    <div className="hud-center">
      <span className="hud-label">Inventory</span>
      <div className="inventory-slots">
        {ACTIVE_ITEMS.map(item => (
          <div
            key={item.label}
            className="inv-slot active"
            title={item.label}
          >
            <i className={`fa-solid ${item.icon}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
