/**
 * searchViz.js — Linear and Binary search animation
 */

const SearchViz = (() => {
  let array = [];
  let frames = [];
  let frameIdx = 0;
  let animTimer = null;

  function getDelay() {
    const speed = parseInt(document.getElementById('speedSlider').value);
    return Math.round(800 - speed * 75);
  }

  function generateArray(sorted = false) {
    const size = parseInt(document.getElementById('sizeSlider').value);
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 5);
    if (sorted) array.sort((a, b) => a - b);
    frames = []; frameIdx = 0;
    renderBars(array, {});
    setStatus('Pick a target and press Search', '');
  }

  function renderBars(arr, state) {
    const c = document.getElementById('searchBarsContainer');
    if (!c) return;
    c.innerHTML = '';
    const maxVal = Math.max(...arr, 1);

    arr.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${(val / maxVal) * 92}%`;
      bar.setAttribute('data-value', arr.length <= 40 ? val : '');

      if (state.found === i)                              bar.classList.add('found');
      else if ((state.eliminated || []).includes(i))      bar.classList.add('sorted'); // grey-out
      else if (state.current === i || state.mid === i)    bar.classList.add('comparing');
      else if (state.low === i || state.high === i)       bar.classList.add('pivot');

      c.appendChild(bar);
    });
  }

  function setStatus(msg, type) {
    const el = document.getElementById('searchStatus');
    el.textContent = msg;
    el.className = 'search-status' + (type ? ` ${type}` : '');
  }

  function run(algoName) {
    clearTimeout(animTimer);
    const target = parseInt(document.getElementById('searchTarget').value);
    if (isNaN(target)) { setStatus('Enter a valid target', 'fail'); return; }

    // For binary search ensure sorted array
    if (algoName === 'binary') {
      array.sort((a, b) => a - b);
      renderBars(array, {});
    }

    frames = algoName === 'binary'
      ? Searching.binary(array, target)
      : Searching.linear(array, target);
    frameIdx = 0;
    animate();
  }

  function animate() {
    if (frameIdx >= frames.length) return;
    const f = frames[frameIdx];
    renderBars(f.array, f);
    setStatus(f.desc, '');
    document.getElementById('stepCounter').textContent = `Step: ${frameIdx}`;

    // Sound
    if (f.current >= 0) Sound.play(Sound.valToFreq(f.array[f.current]), 'compare');
    if (f.found >= 0)   Sound.play(Sound.valToFreq(f.array[f.found]), 'found');

    if (f.status === 'found') { setStatus(f.desc, 'ok'); return; }
    if (f.status === 'notfound') { setStatus(f.desc, 'fail'); return; }

    frameIdx++;
    animTimer = setTimeout(animate, getDelay());
  }

  return { generateArray, run };
})();
