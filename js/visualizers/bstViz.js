/**
 * bstViz.js — Binary Search Tree SVG visualizer
 * Insert, delete, search with animated traversal highlighting
 */

const BSTViz = (() => {
  // Node class
  class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let root = null;
  const R = 22; // node circle radius

  /* ── BST Operations ── */

  function insert(val) {
    val = parseInt(val);
    if (isNaN(val) || val < 1 || val > 999) { showTraversal('Enter a value between 1–999'); return; }
    root = insertNode(root, val);
    draw();
    showTraversal(`Inserted ${val} | Inorder: ${inorder(root, []).join(', ')}`);
    Sound.play(Sound.valToFreq(val % 100), 'compare');
    // Highlight new node briefly
    setTimeout(() => highlightNode(val, 'highlight'), 50);
    setTimeout(() => { draw(); }, 800);
  }

  function insertNode(node, val) {
    if (!node) return new Node(val);
    if (val < node.val) node.left = insertNode(node.left, val);
    else if (val > node.val) node.right = insertNode(node.right, val);
    return node;
  }

  function search(val) {
    val = parseInt(val);
    if (isNaN(val)) return;
    const path = [];
    let cur = root;
    while (cur) {
      path.push(cur.val);
      if (val === cur.val) break;
      cur = val < cur.val ? cur.left : cur.right;
    }
    if (!cur) {
      showTraversal(`${val} not found. Path checked: ${path.join(' → ')}`);
      return;
    }
    // Animate path
    let i = 0;
    function step() {
      if (i > 0) highlightNode(path[i - 1], 'normal');
      if (i < path.length) {
        highlightNode(path[i], i === path.length - 1 ? 'found' : 'highlight');
        Sound.play(Sound.valToFreq(path[i] % 100), i === path.length - 1 ? 'found' : 'compare');
        showTraversal(`Searching: visiting ${path[i]}${i === path.length - 1 ? ` — Found!` : ` → going ${val < path[i] ? 'left' : 'right'}`}`);
        i++;
        setTimeout(step, 500);
      }
    }
    step();
  }

  function deleteVal(val) {
    val = parseInt(val);
    if (isNaN(val)) return;
    const before = inorder(root, []).length;
    root = deleteNode(root, val);
    const after = inorder(root, []).length;
    draw();
    if (before !== after) {
      showTraversal(`Deleted ${val} | Inorder: ${inorder(root, []).join(', ')}`);
      Sound.play(200, 'swap');
    } else {
      showTraversal(`${val} not found in tree`);
    }
  }

  function deleteNode(node, val) {
    if (!node) return null;
    if (val < node.val) { node.left = deleteNode(node.left, val); }
    else if (val > node.val) { node.right = deleteNode(node.right, val); }
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      // Find inorder successor
      let succ = node.right;
      while (succ.left) succ = succ.left;
      node.val = succ.val;
      node.right = deleteNode(node.right, succ.val);
    }
    return node;
  }

  function clear() {
    root = null;
    document.getElementById('bstSvg').innerHTML = '';
    showTraversal('Tree cleared');
  }

  /* ── Layout & Drawing ── */

  // Assign x/y positions using in-order traversal for x, depth for y
  function layout(node, depth = 0, counter = { v: 0 }) {
    if (!node) return;
    layout(node.left, depth + 1, counter);
    node._x = counter.v * 70 + 40;
    node._y = depth * 70 + 40;
    node._d = depth;
    counter.v++;
    layout(node.right, depth + 1, counter);
  }

  function draw() {
    const svg = document.getElementById('bstSvg');
    svg.innerHTML = '';

    if (!root) { svg.innerHTML = '<text x="400" y="180" text-anchor="middle" fill="#2d4a70" font-family="JetBrains Mono" font-size="14">Insert values to build the tree</text>'; return; }

    layout(root);

    // Calculate bounds
    let minX = Infinity, maxX = -Infinity;
    traverse(root, n => { minX = Math.min(minX, n._x); maxX = Math.max(maxX, n._x); });

    // Center offset
    const svgW = 800, svgH = 360;
    const treeW = maxX - minX + 80;
    const offsetX = (svgW - treeW) / 2 - minX + 40;

    // Edges first
    traverse(root, node => {
      if (node.left)  drawEdge(svg, node, node.left,  offsetX);
      if (node.right) drawEdge(svg, node, node.right, offsetX);
    });

    // Nodes on top
    traverse(root, node => drawNodeSVG(svg, node, offsetX));
  }

  function drawEdge(svg, parent, child, ox) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', parent._x + ox); line.setAttribute('y1', parent._y);
    line.setAttribute('x2', child._x + ox);  line.setAttribute('y2', child._y);
    line.setAttribute('stroke', '#2d4a6a'); line.setAttribute('stroke-width', '2');
    svg.appendChild(line);
  }

  function drawNodeSVG(svg, node, ox) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = `bst-node-${node.val}`;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node._x + ox); circle.setAttribute('cy', node._y);
    circle.setAttribute('r', R);
    circle.setAttribute('fill', '#111d35'); circle.setAttribute('stroke', '#4a6fa5'); circle.setAttribute('stroke-width', '2');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node._x + ox); text.setAttribute('y', node._y);
    text.setAttribute('text-anchor', 'middle'); text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#6a8fba'); text.setAttribute('font-family', 'JetBrains Mono,monospace');
    text.setAttribute('font-size', node.val >= 100 ? '10' : '13');
    text.textContent = node.val;

    g.appendChild(circle); g.appendChild(text);
    svg.appendChild(g);
  }

  function highlightNode(val, type) {
    const g = document.getElementById(`bst-node-${val}`);
    if (!g) return;
    const circle = g.querySelector('circle');
    const text = g.querySelector('text');
    if (type === 'highlight') {
      circle.setAttribute('fill', 'rgba(0,212,255,0.25)');
      circle.setAttribute('stroke', '#00d4ff');
      circle.setAttribute('filter', 'drop-shadow(0 0 8px #00d4ff)');
      text.setAttribute('fill', '#00d4ff');
    } else if (type === 'found') {
      circle.setAttribute('fill', 'rgba(0,255,136,0.25)');
      circle.setAttribute('stroke', '#00ff88');
      circle.setAttribute('filter', 'drop-shadow(0 0 12px #00ff88)');
      text.setAttribute('fill', '#00ff88');
    } else {
      circle.setAttribute('fill', '#111d35');
      circle.setAttribute('stroke', '#4a6fa5');
      circle.setAttribute('filter', '');
      text.setAttribute('fill', '#6a8fba');
    }
  }

  function traverse(node, fn) {
    if (!node) return;
    fn(node);
    traverse(node.left, fn);
    traverse(node.right, fn);
  }

  function inorder(node, arr) {
    if (!node) return arr;
    inorder(node.left, arr);
    arr.push(node.val);
    inorder(node.right, arr);
    return arr;
  }

  function showTraversal(msg) {
    document.getElementById('traversalRow').textContent = msg;
  }

  function preload() {
    // Pre-load with a sample tree so the screen isn't empty
    [50, 30, 70, 20, 40, 60, 80].forEach(v => { root = insertNode(root, v); });
    draw();
    showTraversal(`Sample tree loaded | Inorder: ${inorder(root, []).join(', ')}`);
  }

  return { insert, search, deleteVal, clear, preload };
})();
