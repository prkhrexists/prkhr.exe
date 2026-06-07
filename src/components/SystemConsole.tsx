import React from 'react';

const CONSOLE_LINES = [
  { text: '> PRKHR.EXE v2.5.0', delay: '0.0s', highlight: false },
  { text: '> Initializing portfolio world…', delay: '0.9s', highlight: false },
  { text: '> Loading experiences…', delay: '1.8s', highlight: false },
  { text: '> Connecting to projects…', delay: '2.7s', highlight: false },
  { text: '> System check… Done I Guess', delay: '3.6s', highlight: false },
  { text: '> Welcome, User_', delay: '4.5s', highlight: true },
];

export default function SystemConsole() {
  return (
    <div className="console-box" aria-label="System console">
      <div className="console-titlebar">
        <span>SYSTEM CONSOLE</span>
        <div className="console-dots">
          <span className="console-dot dot-red" />
          <span className="console-dot dot-yellow" />
          <span className="console-dot dot-green" />
        </div>
      </div>
      <div className="console-body">
        {CONSOLE_LINES.map(line => (
          <span
            key={line.text}
            className={`console-line${line.highlight ? ' highlight' : ''}`}
            style={{ '--d': line.delay } as React.CSSProperties}
          >
            {line.text}
          </span>
        ))}
      </div>
    </div>
  );
}
