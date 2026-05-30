/**
 * Synthesizes a retro mechanical switch sound using the Web Audio API.
 * No external audio files required — pure oscillator + noise burst.
 */
export function playRetroSound(): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();

    /* ── Layer 1: white-noise click transient ─────────────────── */
    const bufLen = Math.floor(ctx.sampleRate * 0.055);
    const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.3));
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = buf;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);
    noiseSrc.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    /* ── Layer 2: square-wave sweep (power-on blip) ───────────── */
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.13);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);

    /* ── Layer 3: short rising blip ──────────────────────────── */
    const blip  = ctx.createOscillator();
    const bGain = ctx.createGain();
    blip.type = 'sine';
    blip.frequency.setValueAtTime(220, ctx.currentTime + 0.08);
    blip.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.18);
    bGain.gain.setValueAtTime(0.0, ctx.currentTime + 0.08);
    bGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.13);
    bGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    blip.connect(bGain);
    bGain.connect(ctx.destination);

    noiseSrc.start(ctx.currentTime);
    noiseSrc.stop(ctx.currentTime + 0.055);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.16);
    blip.start(ctx.currentTime + 0.08);
    blip.stop(ctx.currentTime + 0.22);
  } catch {
    /* Silently fail if AudioContext unavailable (e.g. SSR) */
  }
}
