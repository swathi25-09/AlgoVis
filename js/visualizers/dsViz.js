/**
 * dsViz.js — Stack, Queue, and Linked List visualizer
 */

const DSViz = (() => {
  let items = [];      // internal data
  let dsType = 'stack'; // 'stack' | 'queue' | 'linkedlist'

  function log(msg, cls = '') {
    const el = document.getElementById('dsLog');
    el.innerHTML = `<span class="${cls}">→ ${msg}</span>`;
  }

  function render() {
    const stage = document.getElementById('dsStage');
    stage.innerHTML = '';

    if (items.length === 0) {
      stage.innerHTML = '<span style="color:var(--txt3);font-family:var(--ff-mono);font-size:.8rem;">Empty…</span>';
      return;
    }

    if (dsType === 'stack') renderStack(stage);
    else if (dsType === 'queue') renderQueue(stage);
    else if (dsType === 'linkedlist') renderLinkedList(stage);
  }

  function renderStack(stage) {
    // Stack: display top-to-bottom (top at start visually)
    stage.style.flexDirection = 'column';
    stage.style.alignItems = 'center';
    stage.style.justifyContent = 'flex-start';

    const topLabel = document.createElement('div');
    topLabel.style.cssText = 'font-size:.65rem;color:var(--yellow);font-family:var(--ff-mono);margin-bottom:4px;';
    topLabel.textContent = '▲ TOP';
    stage.appendChild(topLabel);

    [...items].reverse().forEach((val, i) => {
      const node = document.createElement('div');
      node.className = 'ds-node' + (i === 0 ? ' peek-node' : '');
      node.textContent = val;
      if (i === 0) {
        const lbl = document.createElement('span');
        lbl.className = 'node-label';
        lbl.textContent = 'TOP';
        node.appendChild(lbl);
      }
      stage.appendChild(node);
    });

    const btmLabel = document.createElement('div');
    btmLabel.style.cssText = 'font-size:.65rem;color:var(--txt3);font-family:var(--ff-mono);margin-top:4px;';
    btmLabel.textContent = '▼ BOTTOM';
    stage.appendChild(btmLabel);
  }

  function renderQueue(stage) {
    // Queue: left (front) to right (back)
    stage.style.flexDirection = 'row';
    stage.style.alignItems = 'center';
    stage.style.justifyContent = 'flex-start';

    const frontLabel = document.createElement('span');
    frontLabel.style.cssText = 'font-size:.65rem;color:var(--cyan);font-family:var(--ff-mono);margin-right:6px;white-space:nowrap;';
    frontLabel.textContent = 'FRONT ▶';
    stage.appendChild(frontLabel);

    items.forEach((val, i) => {
      const node = document.createElement('div');
      node.className = 'ds-node' + (i === 0 ? ' peek-node' : '');
      node.textContent = val;
      if (i === 0) {
        const lbl = document.createElement('span');
        lbl.className = 'node-label';
        lbl.textContent = 'FRONT';
        node.appendChild(lbl);
      }
      if (i === items.length - 1) {
        const lbl = document.createElement('span');
        lbl.className = 'node-label';
        lbl.textContent = 'REAR';
        node.appendChild(lbl);
      }
      stage.appendChild(node);
    });

    const rearLabel = document.createElement('span');
    rearLabel.style.cssText = 'font-size:.65rem;color:var(--txt3);font-family:var(--ff-mono);margin-left:6px;white-space:nowrap;';
    rearLabel.textContent = '◀ REAR';
    stage.appendChild(rearLabel);
  }

  function renderLinkedList(stage) {
    stage.style.flexDirection = 'row';
    stage.style.alignItems = 'center';
    stage.style.justifyContent = 'flex-start';

    items.forEach((val, i) => {
      // Node box
      const node = document.createElement('div');
      node.className = 'ds-node';
      node.style.display = 'flex';
      node.style.flexDirection = 'column';
      node.style.alignItems = 'center';
      node.style.padding = '8px 12px';
      node.style.gap = '4px';

      const valDiv = document.createElement('div');
      valDiv.textContent = val;
      valDiv.style.fontWeight = '600';

      const nextDiv = document.createElement('div');
      nextDiv.style.cssText = 'font-size:.62rem;color:var(--txt3);border-top:1px solid rgba(0,212,255,.2);padding-top:4px;margin-top:2px;';
      nextDiv.textContent = i === items.length - 1 ? 'next→NULL' : `next→`;

      if (i === 0) {
        const lbl = document.createElement('span');
        lbl.className = 'node-label';
        lbl.textContent = 'HEAD';
        node.appendChild(lbl);
      }
      node.appendChild(valDiv);
      node.appendChild(nextDiv);
      stage.appendChild(node);

      // Arrow between nodes
      if (i < items.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'll-arrow';
        arrow.textContent = '→';
        stage.appendChild(arrow);
      }
    });

    // NULL terminator
    const nullEl = document.createElement('span');
    nullEl.className = 'll-null';
    nullEl.textContent = 'NULL';
    stage.appendChild(nullEl);
  }

  /* ── Operations ── */

  function push(val) {
    if (!val.trim()) { log('Enter a value first!', 'log-err'); return; }
    if (items.length >= 12) { log('Max capacity reached (12)', 'log-err'); return; }
    items.push(val);
    render();
    log(`Pushed "${val}" — size: ${items.length}`, 'log-ok');
    Sound.play(300 + items.length * 50, 'compare');
  }

  function pop() {
    if (items.length === 0) { log('Underflow! Cannot pop from empty structure.', 'log-err'); return; }

    // Animate the top element removal
    const stage = document.getElementById('dsStage');
    const nodes = stage.querySelectorAll('.ds-node');
    const topNode = dsType === 'stack' ? nodes[0] : nodes[0];

    if (topNode) {
      topNode.classList.add('removing');
      setTimeout(() => {
        const removed = dsType === 'queue' ? items.shift() : items.pop();
        render();
        log(`Removed "${removed}" — size: ${items.length}`, 'log-ok');
      }, 280);
    } else {
      const removed = dsType === 'queue' ? items.shift() : items.pop();
      render();
      log(`Removed "${removed}" — size: ${items.length}`, 'log-ok');
    }
    Sound.play(200, 'swap');
  }

  function peek() {
    if (items.length === 0) { log('Structure is empty!', 'log-err'); return; }
    const val = dsType === 'queue' ? items[0] : items[items.length - 1];
    log(`${dsType === 'queue' ? 'Front' : 'Top'} element: "${val}"`, 'log-info');
    Sound.play(Sound.valToFreq(50), 'found');

    // Flash highlight
    const stage = document.getElementById('dsStage');
    const nodes = stage.querySelectorAll('.ds-node');
    const target = nodes[0]; // top/front is first rendered
    if (target) {
      target.style.transform = 'scale(1.15)';
      setTimeout(() => { target.style.transform = ''; }, 400);
    }
  }

  function clear() {
    items = [];
    render();
    log('Structure cleared.', 'log-info');
  }

  function setType(type) {
    dsType = type;
    items = [];
    render();
    updateButtons();
  }

  function updateButtons() {
    const pushBtn = document.getElementById('dsPushBtn');
    const popBtn  = document.getElementById('dsPopBtn');
    const peekBtn = document.getElementById('dsPeekBtn');

    if (dsType === 'stack') {
      pushBtn.textContent = 'Push'; popBtn.textContent = 'Pop'; peekBtn.textContent = 'Peek';
    } else if (dsType === 'queue') {
      pushBtn.textContent = 'Enqueue'; popBtn.textContent = 'Dequeue'; peekBtn.textContent = 'Front';
    } else {
      pushBtn.textContent = 'Add to Head'; popBtn.textContent = 'Remove Head'; peekBtn.textContent = 'Head Value';
    }
  }

  return { push, pop, peek, clear, setType, render };
})();
