/**
 * sound.js — Web Audio API sound effects
 * Generates tones based on bar height for sorting feedback
 */

const Sound = (() => {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  /**
   * Play a short beep at a given frequency
   * @param {number} freq  - Frequency in Hz (maps to bar value)
   * @param {string} type  - 'compare' | 'swap' | 'sorted' | 'found'
   */
  function play(freq, type = 'compare') {
    if (!enabled) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);

      const configs = {
        compare: { wave: 'sine',     vol: 0.04, dur: 0.07 },
        swap:    { wave: 'triangle', vol: 0.07, dur: 0.09 },
        sorted:  { wave: 'sine',     vol: 0.08, dur: 0.12 },
        found:   { wave: 'sine',     vol: 0.12, dur: 0.25 },
        pivot:   { wave: 'square',   vol: 0.04, dur: 0.06 },
      };
      const { wave, vol, dur } = configs[type] || configs.compare;

      osc.type = wave;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      gain.gain.setValueAtTime(vol, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);

      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + dur);
    } catch (e) { /* silent fail */ }
  }

  /** Map a bar value (1-100) to a musical frequency (200-1200 Hz) */
  function valToFreq(val) {
    return 200 + (val / 100) * 1000;
  }

  function toggle() {
    enabled = !enabled;
    return enabled;
  }

  function isEnabled() { return enabled; }

  return { play, valToFreq, toggle, isEnabled };
})();
