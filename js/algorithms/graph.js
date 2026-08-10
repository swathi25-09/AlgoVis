/**
 * graph.js — BFS and DFS step generators + graph definition
 */

const GraphAlgo = (() => {

  // Graph definition: nodes with positions + adjacency list
  const GRAPH = {
    nodes: [
      { id: 0, x: 340, y: 40  },
      { id: 1, x: 160, y: 120 },
      { id: 2, x: 520, y: 120 },
      { id: 3, x: 80,  y: 220 },
      { id: 4, x: 240, y: 220 },
      { id: 5, x: 440, y: 220 },
      { id: 6, x: 600, y: 220 },
      { id: 7, x: 140, y: 310 },
      { id: 8, x: 340, y: 310 },
      { id: 9, x: 520, y: 310 },
    ],
    edges: [
      [0,1],[0,2],
      [1,3],[1,4],
      [2,5],[2,6],
      [3,7],[4,8],
      [5,8],[5,9],[6,9],
    ]
  };

  // Build adjacency list
  function buildAdj() {
    const adj = {};
    GRAPH.nodes.forEach(n => adj[n.id] = []);
    GRAPH.edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    return adj;
  }

  function makeStep(visited, visiting, queue, activeEdge, desc) {
    return {
      visited:    [...visited],
      visiting:   visiting,
      queue:      [...queue],
      activeEdge: activeEdge ? [...activeEdge] : null,
      desc
    };
  }

  /* ── BFS ── */
  function bfs(startId = 0) {
    const adj = buildAdj();
    const steps = [];
    const visited = new Set();
    const queue = [startId];
    visited.add(startId);

    steps.push(makeStep(visited, startId, queue, null, `BFS starts at node ${startId}. Adding to queue.`));

    while (queue.length) {
      const node = queue.shift();
      steps.push(makeStep(visited, node, queue, null, `Dequeued node ${node}. Exploring its neighbors.`));

      for (const neighbor of adj[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          steps.push(makeStep(visited, neighbor, queue, [node, neighbor],
            `Discovered node ${neighbor} from ${node}. Added to queue.`));
        } else {
          steps.push(makeStep(visited, node, queue, [node, neighbor],
            `Node ${neighbor} already visited — skipping.`));
        }
      }
    }

    steps.push(makeStep(visited, -1, [], null, `✅ BFS complete! Visited ${visited.size} nodes.`));
    return { steps, graph: GRAPH };
  }

  /* ── DFS ── */
  function dfs(startId = 0) {
    const adj = buildAdj();
    const steps = [];
    const visited = new Set();

    function explore(node, parent) {
      visited.add(node);
      steps.push(makeStep(visited, node, [node], parent !== null ? [parent, node] : null,
        `DFS visiting node ${node}${parent !== null ? ` from ${parent}` : ' (start)'}.`));

      for (const neighbor of adj[node]) {
        if (!visited.has(neighbor)) {
          steps.push(makeStep(visited, node, [node], [node, neighbor],
            `Exploring edge ${node} → ${neighbor}`));
          explore(neighbor, node);
        } else {
          steps.push(makeStep(visited, node, [node], [node, neighbor],
            `Node ${neighbor} already visited — backtracking.`));
        }
      }

      steps.push(makeStep(visited, node, [], null, `Backtracking from node ${node}.`));
    }

    explore(startId, null);
    steps.push(makeStep(visited, -1, [], null, `✅ DFS complete! Visited ${visited.size} nodes.`));
    return { steps, graph: GRAPH };
  }

  return { bfs, dfs, GRAPH };
})();
