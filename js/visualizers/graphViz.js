/**
 * graphViz.js — SVG graph visualizer for BFS and DFS
 */

const GraphViz = (() => {
  let steps = [];
  let stepIdx = 0;
  let animTimer = null;
  let currentAlgo = 'bfs';

  function getDelay() {
    const speed = parseInt(document.getElementById('speedSlider').value);
    return Math.round(1000 - speed * 90);
  }

  /** Draw the static graph (nodes + edges) */
  function drawGraph(graph) {
    const svg = document.getElementById('graphSvg');
    svg.innerHTML = '';

    // Defs: arrowhead marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 Z" fill="#2d4a6a"/>
      </marker>`;
    svg.appendChild(defs);

    // Edges
    graph.edges.forEach(([a, b]) => {
      const na = graph.nodes[a], nb = graph.nodes[b];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', na.x); line.setAttribute('y1', na.y);
      line.setAttribute('x2', nb.x); line.setAttribute('y2', nb.y);
      line.setAttribute('stroke', '#2d4a6a');
      line.setAttribute('stroke-width', '2');
      line.id = `edge-${a}-${b}`;
      line.classList.add('graph-edge');
      svg.appendChild(line);
    });

    // Nodes
    graph.nodes.forEach(n => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.id = `node-${n.id}`;
      g.classList.add('graph-node');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y); circle.setAttribute('r', 22);
      circle.setAttribute('fill', '#111d35'); circle.setAttribute('stroke', '#2d4a6a'); circle.setAttribute('stroke-width', '2');

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', n.x); text.setAttribute('y', n.y);
      text.setAttribute('text-anchor', 'middle'); text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#6a8fba'); text.setAttribute('font-family', 'JetBrains Mono,monospace');
      text.setAttribute('font-size', '13');
      text.textContent = n.id;

      g.appendChild(circle); g.appendChild(text);
      svg.appendChild(g);
    });
  }

  /** Apply a traversal step to the SVG */
  function applyStep(step, graph) {
    // Reset all edges
    graph.edges.forEach(([a, b]) => {
      const el = document.getElementById(`edge-${a}-${b}`);
      if (el) { el.setAttribute('stroke', '#2d4a6a'); el.setAttribute('stroke-width', '2'); }
      const el2 = document.getElementById(`edge-${b}-${a}`);
      if (el2) { el2.setAttribute('stroke', '#2d4a6a'); el2.setAttribute('stroke-width', '2'); }
    });

    // Color nodes
    graph.nodes.forEach(n => {
      const circle = document.querySelector(`#node-${n.id} circle`);
      const text = document.querySelector(`#node-${n.id} text`);
      if (!circle) return;

      if (step.visited.includes(n.id) && step.visiting !== n.id) {
        circle.setAttribute('fill', 'rgba(0,255,136,0.18)');
        circle.setAttribute('stroke', '#00ff88');
        circle.setAttribute('filter', 'drop-shadow(0 0 8px #00ff88)');
        text.setAttribute('fill', '#00ff88');
      } else if (step.visiting === n.id) {
        circle.setAttribute('fill', 'rgba(255,140,0,0.25)');
        circle.setAttribute('stroke', '#ff8c00');
        circle.setAttribute('filter', 'drop-shadow(0 0 10px #ff8c00)');
        text.setAttribute('fill', '#ff8c00');
      } else {
        circle.setAttribute('fill', '#111d35');
        circle.setAttribute('stroke', '#2d4a6a');
        circle.setAttribute('filter', '');
        text.setAttribute('fill', '#6a8fba');
      }

      // Start node stays cyan
      if (n.id === 0 && !step.visited.includes(n.id) && step.visiting !== n.id) {
        circle.setAttribute('stroke', '#00d4ff');
        text.setAttribute('fill', '#00d4ff');
      }
    });

    // Highlight active edge
    if (step.activeEdge) {
      const [a, b] = step.activeEdge;
      const el = document.getElementById(`edge-${a}-${b}`) || document.getElementById(`edge-${b}-${a}`);
      if (el) {
        el.setAttribute('stroke', '#00d4ff');
        el.setAttribute('stroke-width', '3');
      }
    }

    // Queue/stack display
    const qd = document.getElementById('graphQueueDisplay');
    const label = currentAlgo === 'bfs' ? 'Queue' : 'Stack';
    qd.textContent = `${label}: [${step.queue.join(', ')}]  |  ${step.desc}`;

    document.getElementById('graphInfo').textContent = step.desc;
    document.getElementById('stepCounter').textContent = `Step: ${stepIdx}`;
  }

  function run(algoName, graph) {
    currentAlgo = algoName;
    clearTimeout(animTimer);
    const result = algoName === 'bfs' ? GraphAlgo.bfs(0) : GraphAlgo.dfs(0);
    steps = result.steps;
    stepIdx = 0;
    drawGraph(result.graph);
    animate(result.graph);
  }

  function animate(graph) {
    if (stepIdx >= steps.length) {
      document.getElementById('graphInfo').textContent = `✅ ${currentAlgo.toUpperCase()} traversal complete!`;
      return;
    }
    applyStep(steps[stepIdx], graph);
    stepIdx++;
    animTimer = setTimeout(() => animate(graph), getDelay());
  }

  function reset() {
    clearTimeout(animTimer);
    steps = []; stepIdx = 0;
    const { graph } = currentAlgo === 'bfs' ? GraphAlgo.bfs(0) : GraphAlgo.dfs(0);
    drawGraph(GraphAlgo.GRAPH);
    document.getElementById('graphInfo').textContent = 'Click Run to start traversal from node 0';
    document.getElementById('graphQueueDisplay').textContent = '';
  }

  function init(algoName) {
    currentAlgo = algoName;
    drawGraph(GraphAlgo.GRAPH);
  }

  return { run, reset, init };
})();
