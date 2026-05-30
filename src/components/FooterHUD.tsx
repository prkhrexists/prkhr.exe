import Inventory from './Inventory';
import { useZone } from '../context/ZoneContext';

export default function FooterHUD() {
  const { hudLore } = useZone();

  return (
    <footer id="footer-hud">
      <div className="hud-section">
        <span className="hud-label">Current Location</span>
        <span className="hud-value">
          <i className="fa-solid fa-location-dot" />&nbsp;{hudLore.location}
        </span>
      </div>

      <div className="hud-section">
        <span className="hud-label">Mission</span>
        <span
          style={{
            fontFamily: 'var(--font-term)',
            fontSize: '0.9rem',
            color: '#aaa',
            maxWidth: '180px',
            lineHeight: 1.3,
          }}
        >
          {hudLore.mission}
        </span>
      </div>

      <Inventory />

      <div className="hud-section">
        <span className="hud-label">Status</span>
        <div className="hp-bars">
          <div className="hp-bar-row">
            <i className="fa-solid fa-heart" style={{ color: '#ef476f' }} />
            <div className="bar-track">
              <div className="bar-fill bar-hp" style={{ width: '100%' }} />
            </div>
            <span className="hp-bar-val">100/100</span>
          </div>
          <div className="hp-bar-row">
            <i className="fa-solid fa-bolt" style={{ color: 'var(--col-yellow)' }} />
            <div className="bar-track">
              <div className="bar-fill bar-mp" style={{ width: '80%' }} />
            </div>
            <span className="hp-bar-val">80/100</span>
          </div>
        </div>
      </div>

      <div className="hud-section" style={{ alignItems: 'flex-end' }}>
        <span className="hud-label">Let's Connect</span>
        <div className="social-links">
          <a href="#" aria-label="GitHub"><i className="fa-brands fa-github" /></a>
          <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin" /></a>
          <a href="#" aria-label="Email"><i className="fa-solid fa-envelope" /></a>
        </div>
      </div>
    </footer>
  );
}
