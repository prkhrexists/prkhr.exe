import { motion, AnimatePresence } from 'framer-motion';

interface RetroErrorModalProps {
  show: boolean;
  onDismiss: () => void;
}

/**
 * RetroErrorModal — styled as a pixelated DOS/BIOS error box.
 * Wrapped in AnimatePresence for spring-pop-in / fade-out.
 */
export default function RetroErrorModal({ show, onDismiss }: RetroErrorModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Dark backdrop — click to dismiss */}
          <motion.div
            key="retro-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onDismiss}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.82)',
              zIndex: 300,
              cursor: 'pointer',
            }}
          />

          {/* Modal box */}
          <motion.div
            key="retro-modal"
            initial={{ opacity: 0, scale: 0.65, y: -30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', damping: 13, stiffness: 220 },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              y: 20,
              transition: { duration: 0.18 },
            }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 301,
              width: 'min(480px, 92vw)',
              fontFamily: 'var(--font-pixel)',
              imageRendering: 'pixelated',
            }}
          >
            {/* Title bar — Windows 9x style */}
            <div
              style={{
                background: '#c0392b',
                padding: '5px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '2px solid #000',
                borderTop: '2px solid #e74c3c',
                borderLeft: '2px solid #e74c3c',
                borderRight: '2px solid #7b241c',
              }}
            >
              <span style={{ fontSize: '0.5rem', color: '#fff', letterSpacing: '0.08em' }}>
                ⚠ SYSTEM ERROR — PRKHR.EXE
              </span>
              <button
                onClick={onDismiss}
                style={{
                  background: '#c0c0c0',
                  border: '2px outset #fff',
                  padding: '0 7px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.55rem',
                  color: '#000',
                  lineHeight: '1.6',
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                background: '#0a0208',
                border: '2px solid #c0392b',
                borderTop: 'none',
                borderLeft: '2px solid #e74c3c',
                borderRight: '2px solid #7b241c',
                borderBottom: '2px solid #7b241c',
                padding: '2rem 1.5rem',
                textAlign: 'center',
              }}
            >
              {/* Animated skull/explosion icon */}
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{ fontSize: '2.8rem', marginBottom: '1.2rem', display: 'block' }}
              >
                💥
              </motion.div>

              {/* Blinking error label */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                style={{
                  fontSize: '0.5rem',
                  color: '#ef476f',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                }}
              >
                ████ CRITICAL ERROR ████
              </motion.div>

              <p
                style={{
                  fontSize: '0.42rem',
                  color: '#e8e8f0',
                  lineHeight: 2.4,
                  marginBottom: '1.75rem',
                  letterSpacing: '0.06em',
                }}
              >
                GPU overheated during render.<br />
                Magic smoke released.<br />
                Please check back later.
              </p>

              {/* Error code */}
              <p
                style={{
                  fontSize: '0.35rem',
                  color: '#555',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.04em',
                }}
              >
                ERROR CODE: 0xDEADBEEF | VRAM: 0KB / 0KB
              </p>

              <button
                onClick={onDismiss}
                className="btn btn-outline"
                style={{
                  borderColor: '#ef476f',
                  color: '#ef476f',
                  fontSize: '0.45rem',
                  padding: '0.6rem 1.5rem',
                }}
              >
                [ OK ] ACKNOWLEDGE ERROR
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
