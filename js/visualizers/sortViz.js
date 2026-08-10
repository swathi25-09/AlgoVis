/**
 * sortViz.js — Sorting & bar rendering engine
 */

const SortViz = (() => {
  const container = () => document.getElementById('barsContainer');

  let array = [];
  let frames = [];
  let frameIdx = 0;
  let running = false;
  let paused = false;
  let animTimer = null;
  let startTime = 0;

  // Stats
  let comparisons = 0, swaps = 0;

  function getDelay() {
    const speed = parseInt(document.getElementById('speedSlider').value);
    // speed 1 = slow (600ms), speed 10 = fast (20ms)
    return Math.round(620 - speed * 60);
  }

  /** Generate a new random array based on size slider */
  function generateArray() {
    const size = parseInt(document.getElementById('sizeSlider').value);
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
    frames = [];
    frameIdx = 0;
    comparisons = 0; swaps = 0;
    renderBars(array, { sorted: [], comparing: [], swapping: [] });
    updateStats(0, 0, 0);
  }

  /** Render the bars from an array + highlight state */
  function renderBars(arr, state = {}) {
    const c = container();
    if (!c) return;
    c.innerHTML = '';
    const maxVal = Math.max(...arr, 1);
    const totalW = c.clientWidth || 600;
    const gap = arr.length > 50 ? 1 : 2;
    const barW = Math.max(2, Math.floor((totalW - gap * arr.length) / arr.length));

    arr.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      const hPct = (val / maxVal) * 92;
      bar.style.height = `${hPct}%`;
      bar.setAttribute('data-value', arr.length <= 40 ? val : '');

      // Apply colour class based on state
      if ((state.sorted || []).includes(i))      bar.classList.add('sorted');
      else if ((state.swapping || []).includes(i)) bar.classList.add('swapping');
      else if ((state.comparing || []).includes(i)) bar.classList.add('comparing');
      else if (state.pivot === i)                  bar.classList.add('pivot');
      else if (state.current === i)                bar.classList.add('current');

      c.appendChild(bar);
    });
  }

  /** Apply a single frame */
  function applyFrame(f) {
    // Count stats
    if (f.comparing && f.comparing.length) comparisons++;
    if (f.swapping && f.swapping.length) swaps++;

    renderBars(f.array, f);
    updateStats(frameIdx, comparisons, swaps);

    // Sound
    if (f.swapping && f.swapping.length) {
      Sound.play(Sound.valToFreq(f.array[f.swapping[0]]), 'swap');
    } else if (f.comparing && f.comparing.length) {
      Sound.play(Sound.valToFreq(f.array[f.comparing[0]]), 'compare');
    }
    if (f.status === 'done') {
      // ripple-sort the last render
      sortedRipple(f.array);
    }
  }

  function sortedRipple(arr) {
    const bars = container().querySelectorAll('.bar');
    bars.forEach((b, i) => {
      setTimeout(() => {
        b.classList.remove('comparing','swapping','pivot','current');
        b.classList.add('sorted');
        Sound.play(Sound.valToFreq(arr[i]), 'sorted');
      }, i * 18);
    });
  }

  function updateStats(step, comp, sw) {
    document.getElementById('stepCounter').textContent = `Step: ${step}`;
    document.getElementById('compCounter').textContent = `Comparisons: ${comp}`;
    document.getElementById('swapCounter').textContent = `Swaps: ${sw}`;
    if (startTime) {
      document.getElementById('timeElapsed').textContent = `Time: ${Date.now() - startTime}ms`;
    }
  }

  /** Start full animation */
  function start(algoName) {
    if (running) return;
    // Generate frames
    const generators = {
      bubble: Sorting.bubble, selection: Sorting.selection,
      insertion: Sorting.insertion, merge: Sorting.merge, quick: Sorting.quick
    };
    const gen = generators[algoName];
    if (!gen) return;

    frames = gen(array);
    frameIdx = 0;
    comparisons = 0; swaps = 0;
    running = true; paused = false;
    startTime = Date.now();
    setButtonState(true);
    tick();
  }

  function tick() {
    if (!running || paused) return;
    if (frameIdx >= frames.length) {
      finish();
      return;
    }
    applyFrame(frames[frameIdx]);
    frameIdx++;
    animTimer = setTimeout(tick, getDelay());
  }

  function pause() {
    if (!running) return;
    paused = !paused;
    if (!paused) tick();
    document.getElementById('pauseBtn').textContent = paused ? '▶ Resume' : '⏸ Pause';
  }

  /** Step-by-step: advance one frame */
  function step(algoName) {
    if (!frames.length) {
      const generators = {
        bubble: Sorting.bubble, selection: Sorting.selection,
        insertion: Sorting.insertion, merge: Sorting.merge, quick: Sorting.quick
      };
      frames = (generators[algoName] || Sorting.bubble)(array);
      comparisons = 0; swaps = 0;
      startTime = Date.now();
    }
    if (frameIdx < frames.length) {
      applyFrame(frames[frameIdx]);
      frameIdx++;
    }
    if (frameIdx >= frames.length) finish();
  }

  function reset() {
    clearTimeout(animTimer);
    running = false; paused = false;
    frames = []; frameIdx = 0;
    comparisons = 0; swaps = 0;
    startTime = 0;
    setButtonState(false);
    document.getElementById('pauseBtn').textContent = '⏸ Pause';
    generateArray();
  }

  function finish() {
    running = false;
    clearTimeout(animTimer);
    // Final ripple
    if (frames.length) {
      sortedRipple(frames[frames.length - 1].array);
    }
    updateStats(frameIdx, comparisons, swaps);
    setButtonState(false);
    showToast('✅ Sort complete!', 'ok');
  }

  function setButtonState(isRunning) {
    document.getElementById('startBtn').disabled = isRunning;
    document.getElementById('pauseBtn').disabled = !isRunning;
    document.getElementById('generateBtn').disabled = isRunning;
    document.getElementById('sizeSlider').disabled = isRunning;
  }

  return { generateArray, start, pause, step, reset, getArray: () => array };
})();
