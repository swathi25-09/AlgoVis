/**
 * app.js — Main application controller
 * Handles: navigation, algorithm switching, button events, theme, tabs
 */

/* ── State ── */
const State = {
  category: 'sorting',   // sorting | searching | graph | ds
  algo: 'bubble',        // current algorithm key
  lang: 'js',            // code language
  running: false,
};

/* ── DOM refs ── */
const $ = id => document.getElementById(id);

/* ── Toast ── */
function showToast(msg, type = '') {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ` ${type}` : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 2400);
}
window.showToast = showToast; // expose globally

/* ── Info Panel: populate from ALGO_DATA ── */
function loadAlgoInfo(key) {
  const d = ALGO_DATA[key];
  if (!d) return;

  $('algoTitle').textContent = d.title;
  $('timeBadge').textContent = `⏱ ${d.time}`;
  $('spaceBadge').textContent = `💾 ${d.space}`;
  $('caseBadge').textContent = `Best: ${d.best}`;

  $('algoDesc').textContent = d.desc;
  $('cxBest').textContent   = d.best;
  $('cxAvg').textContent    = d.avg;
  $('cxWorst').textContent  = d.worst;
  $('cxSpace').textContent  = d.space;
  $('cxStable').textContent = d.stable;

  // Use cases
  const uc = $('useCases');
  uc.innerHTML = `<h4>Use Cases</h4><ul>${d.uses.map(u => `<li>${u}</li>`).join('')}</ul>`;

  // Pseudocode
  $('pseudoBlock').textContent = d.pseudo || 'No pseudocode available.';

  // Code
  loadCode(key, State.lang);

  // Complexity chart
  CompareChart.draw();
}

function loadCode(key, lang) {
  const d = ALGO_DATA[key];
  if (!d || !d.code) return;
  $('codeBlock').textContent = d.code[lang] || d.code['js'] || 'Not available';
}

/* ── Category / Algorithm Navigation ── */
function switchCategory(cat) {
  State.category = cat;

  // Nav buttons
  document.querySelectorAll('.nav-cat').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));

  // Sidebar groups
  document.querySelectorAll('.algo-group').forEach(g => g.classList.toggle('hidden', g.dataset.group !== cat));

  // Auto-select first algorithm in the category
  const firstBtn = document.querySelector(`.algo-group[data-group="${cat}"] .algo-btn`);
  if (firstBtn) firstBtn.click();
}

function switchAlgo(key) {
  State.algo = key;

  // Sidebar highlight
  document.querySelectorAll('.algo-btn').forEach(b => b.classList.toggle('active', b.dataset.algo === key));

  // Load info
  loadAlgoInfo(key);

  // Show correct visualizer
  const cat = ALGO_DATA[key]?.category || State.category;
  showViz(cat, key);

  // Reset stats
  resetStats();
}

function showViz(cat, key) {
  // Hide all viz boxes
  document.querySelectorAll('.viz-box').forEach(v => v.classList.add('hidden'));
  $('controlsBar').style.display = 'flex';
  $('statsRow').style.display = 'flex';

  if (cat === 'sorting') {
    $('sortingViz').classList.remove('hidden');
    SortViz.generateArray();

  } else if (cat === 'searching') {
    $('searchViz').classList.remove('hidden');
    $('controlsBar').style.display = 'none';
    SearchViz.generateArray(key === 'binary');

  } else if (cat === 'graph') {
    $('graphViz').classList.remove('hidden');
    $('controlsBar').style.display = 'none';
    $('statsRow').style.display = 'none';
    GraphViz.init(key);

  } else if (cat === 'ds') {
    if (key === 'bst') {
      $('bstViz').classList.remove('hidden');
      $('controlsBar').style.display = 'none';
      $('statsRow').style.display = 'none';
      BSTViz.preload();
    } else {
      $('dsViz').classList.remove('hidden');
      $('controlsBar').style.display = 'none';
      $('statsRow').style.display = 'none';
      DSViz.setType(key);
    }
  }
}

function resetStats() {
  $('stepCounter').textContent = 'Step: 0';
  $('compCounter').textContent = 'Comparisons: 0';
  $('swapCounter').textContent = 'Swaps: 0';
  $('timeElapsed').textContent = 'Time: 0ms';
}

/* ── Tabs ── */
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('hidden', p.id !== `tab-${tab}`));
  if (tab === 'compare') CompareChart.draw();
}

/* ── Controls ── */
function bindControls() {
  // Nav categories
  document.querySelectorAll('.nav-cat').forEach(btn => {
    btn.addEventListener('click', () => switchCategory(btn.dataset.cat));
  });

  // Algo buttons
  document.querySelectorAll('.algo-btn').forEach(btn => {
    btn.addEventListener('click', () => switchAlgo(btn.dataset.algo));
  });

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Sort controls
  $('generateBtn').addEventListener('click', () => {
    SortViz.generateArray();
    resetStats();
  });
  $('startBtn').addEventListener('click', () => {
    if (State.category === 'sorting') SortViz.start(State.algo);
  });
  $('pauseBtn').addEventListener('click', () => SortViz.pause());
  $('resetBtn').addEventListener('click', () => {
    SortViz.reset();
    resetStats();
  });
  $('stepBtn').addEventListener('click', () => {
    if (State.category === 'sorting') SortViz.step(State.algo);
  });

  // Sliders
  $('sizeSlider').addEventListener('input', e => {
    $('sizeVal').textContent = e.target.value;
    if (State.category === 'sorting') SortViz.generateArray();
    else if (State.category === 'searching') SearchViz.generateArray(State.algo === 'binary');
  });
  $('speedSlider').addEventListener('input', e => {
    $('speedVal').textContent = e.target.value;
  });

  // Search
  $('startSearchBtn').addEventListener('click', () => SearchViz.run(State.algo));
  $('searchTarget').addEventListener('keydown', e => {
    if (e.key === 'Enter') SearchViz.run(State.algo);
  });

  // Graph
  $('runGraphBtn').addEventListener('click', () => GraphViz.run(State.algo, GraphAlgo.GRAPH));
  $('resetGraphBtn').addEventListener('click', () => GraphViz.reset());

  // DS Controls
  $('dsPushBtn').addEventListener('click', () => DSViz.push($('dsInput').value));
  $('dsPopBtn').addEventListener('click',  () => DSViz.pop());
  $('dsPeekBtn').addEventListener('click', () => DSViz.peek());
  $('dsClearBtn').addEventListener('click',() => DSViz.clear());
  $('dsInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') DSViz.push($('dsInput').value);
  });
  // Clear input after push
  $('dsPushBtn').addEventListener('click', () => { $('dsInput').value = ''; });

  // BST controls
  $('bstInsertBtn').addEventListener('click', () => { BSTViz.insert($('bstInput').value); $('bstInput').value = ''; });
  $('bstDeleteBtn').addEventListener('click', () => { BSTViz.deleteVal($('bstInput').value); $('bstInput').value = ''; });
  $('bstSearchBtn').addEventListener('click', () => BSTViz.search($('bstInput').value));
  $('bstClearBtn').addEventListener('click',  () => BSTViz.clear());
  $('bstInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { BSTViz.insert(e.target.value); e.target.value = ''; }
  });

  // Theme toggle
  $('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
    $('themeToggle').textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
    showToast(document.body.classList.contains('light') ? 'Light mode on' : 'Dark mode on');
  });

  // Sound toggle
  $('soundToggle').addEventListener('click', () => {
    const on = Sound.toggle();
    $('soundToggle').textContent = on ? '🔊' : '🔇';
    showToast(on ? 'Sound on' : 'Sound off');
  });

  // Code language
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      State.lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === State.lang));
      loadCode(State.algo, State.lang);
    });
  });

  // Copy code
  $('copyBtn').addEventListener('click', () => {
    const code = $('codeBlock').textContent;
    navigator.clipboard.writeText(code).then(() => showToast('Code copied!', 'ok')).catch(() => showToast('Copy failed', 'err'));
  });

  // Stats row flash on change (MutationObserver)
  document.querySelectorAll('#statsRow span').forEach(s => {
    new MutationObserver(() => {
      s.classList.add('lit');
      setTimeout(() => s.classList.remove('lit'), 300);
    }).observe(s, { childList: true, characterData: true, subtree: true });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  bindControls();
  // Start on Bubble Sort
  switchAlgo('bubble');
  loadAlgoInfo('bubble');
  CompareChart.draw();
});
