# AlgoVis — Complete Project Guide

## ──────────────────────────────────────────────
## 1. FOLDER STRUCTURE
## ──────────────────────────────────────────────

algovis/
├── index.html               ← Entry point — open this in a browser
├── css/
│   └── style.css            ← All styles (dark theme, glassmorphism, animations)
├── js/
│   ├── data.js              ← Descriptions, complexity, pseudocode, code for all algos
│   ├── particles.js         ← Canvas particle background
│   ├── sound.js             ← Web Audio API sound engine
│   ├── app.js               ← Main controller: navigation, event binding
│   ├── compareChart.js      ← Canvas bar chart (performance comparison)
│   ├── algorithms/
│   │   ├── sorting.js       ← Bubble/Selection/Insertion/Merge/Quick step generators
│   │   ├── searching.js     ← Linear/Binary search step generators
│   │   └── graph.js         ← BFS/DFS step generators + graph definition
│   └── visualizers/
│       ├── sortViz.js       ← Renders animated sorting bars
│       ├── searchViz.js     ← Renders search bar animation
│       ├── graphViz.js      ← SVG graph renderer + step animator
│       ├── dsViz.js         ← Stack / Queue / Linked List renderer
│       └── bstViz.js        ← Binary Search Tree SVG renderer


## ──────────────────────────────────────────────
## 2. STEP-BY-STEP SETUP GUIDE
## ──────────────────────────────────────────────

STEP 1 — Download / Clone the project
  Option A: Download ZIP from GitHub → unzip
  Option B: git clone https://github.com/your-username/algovis.git

STEP 2 — Open in a browser
  Simply double-click index.html  OR
  Right-click → "Open With" → your browser

STEP 3 (Recommended) — Use a local server
  Reason: avoids browser security restrictions on local files

  Using Python (no install needed):
    cd algovis
    python3 -m http.server 8080
    → Open http://localhost:8080

  Using Node.js:
    npx serve .
    → Open http://localhost:3000

  Using VS Code:
    Install "Live Server" extension
    Right-click index.html → "Open with Live Server"

STEP 4 — Start exploring!
  • Click any algorithm in the left sidebar
  • Press ▶ Start to begin animation
  • Use the sliders to change speed and array size
  • Click "⏭ Step" for manual step-by-step execution
  • Check the right panel for pseudocode and code implementations


## ──────────────────────────────────────────────
## 3. HOW TO USE EACH FEATURE
## ──────────────────────────────────────────────

SORTING ALGORITHMS (Bubble, Selection, Insertion, Merge, Quick):
  1. Select an algorithm from the left sidebar
  2. Use "Size" slider to set array size (5–80)
  3. Click "⟳ New Array" to generate a new random array
  4. Click "▶ Start" to begin the animation
  5. Click "⏸ Pause" to pause mid-animation
  6. Click "⏭ Step" to advance one frame at a time
  7. Watch the stats: Comparisons and Swaps counters
  8. Colors:
     • Orange = currently comparing
     • Red/Pink = currently swapping
     • Yellow = pivot element (Quick Sort)
     • Green = in final sorted position
     • Purple = current element (Insertion Sort)

SEARCHING ALGORITHMS (Linear, Binary):
  1. Select Linear Search or Binary Search
  2. For Binary Search, the array is auto-sorted
  3. Enter a "Target" value (try something visible in the bars)
  4. Click "▶ Search"
  5. Watch the bars highlight as the algorithm scans
  6. A cyan pulse = found! Greyed bars = eliminated

GRAPH ALGORITHMS (BFS, DFS):
  1. Select BFS or DFS from the sidebar
  2. Click "▶ Run" to start traversal from node 0
  3. Orange = currently visiting
  4. Green = already visited
  5. Blue edge = active traversal path
  6. The Queue/Stack display shows live state

DATA STRUCTURES (Stack, Queue, Linked List):
  1. Type a value in the input field
  2. Click "Push/Enqueue/Add" to add elements
  3. Click "Pop/Dequeue/Remove" to remove
  4. Click "Peek/Front" to highlight top/front element
  5. Yellow = top/front element indicator

BINARY SEARCH TREE:
  1. Type a number (1–99) and click Insert
  2. The tree redraws with the new node
  3. Try Search — it animates the comparison path
  4. Click Delete to remove a node (handles all 3 BST delete cases)
  5. Inorder traversal is shown below the controls


## ──────────────────────────────────────────────
## 4. DEPLOYMENT GUIDE
## ──────────────────────────────────────────────

── GITHUB PAGES (Free, permanent URL) ──────────

1. Create a GitHub account at github.com (if you don't have one)

2. Create a new repository:
   • Go to github.com → click "+" → "New repository"
   • Name it: algovis  (or any name)
   • Set to Public
   • Click "Create repository"

3. Upload your files:
   Option A (Drag & Drop):
   • Open the repository → click "Add file" → "Upload files"
   • Drag the entire project folder contents
   • Commit changes

   Option B (Git CLI):
     cd algovis
     git init
     git add .
     git commit -m "Initial commit: AlgoVis DSA Visualizer"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/algovis.git
     git push -u origin main

4. Enable GitHub Pages:
   • Go to repository → Settings → Pages (left sidebar)
   • Under "Source": select "Deploy from a branch"
   • Branch: main, Folder: / (root)
   • Click Save

5. Wait 1–2 minutes → your site is live at:
   https://YOUR-USERNAME.github.io/algovis


── NETLIFY (Free, fastest deployment) ──────────

Method A — Drag & Drop (no account needed):
  1. Go to netlify.com
  2. Drag your project folder onto the page
  3. Site is INSTANTLY live at a random URL like:
     https://random-name-123.netlify.app
  4. Click "Site settings" → rename it to something memorable

Method B — GitHub Integration (auto-deploy on push):
  1. Push code to GitHub (steps above)
  2. Go to netlify.com → "Add new site" → "Import an existing project"
  3. Connect GitHub → select your repo
  4. Build settings: leave everything empty (static site)
  5. Click "Deploy site"
  6. Every future `git push` auto-deploys!

Custom domain:
  • Netlify: Site settings → Domain management → Add custom domain
  • GitHub Pages: Settings → Pages → Custom domain


## ──────────────────────────────────────────────
## 5. ALGORITHM EXPLANATIONS
## ──────────────────────────────────────────────

BUBBLE SORT
  How: Compare pairs of adjacent elements. If the left is bigger, swap them.
       Repeat until no swaps occur in a full pass.
  Why "Bubble": Large elements "bubble up" to the right on each pass.
  Key insight: After pass i, the last i elements are in their final positions.
  Best case: O(n) — when array is already sorted (0 swaps with early exit)
  Worst case: O(n²) — when array is reverse sorted

SELECTION SORT
  How: Find the minimum element in the unsorted portion. Swap it into position.
       Move the sorted boundary one step right. Repeat.
  Key insight: Makes EXACTLY n-1 swaps — great when writes are expensive.
  Downside: Always O(n²) comparisons regardless of input state.

INSERTION SORT
  How: Take element i. Shift all larger sorted elements right. Insert element i.
  Key insight: Like sorting playing cards — you pick up a card and slide it
               into the right slot.
  Best case: O(n) for nearly sorted arrays.
  Used in: TimSort (Python, Java) as the base case for small subarrays.

MERGE SORT
  How: Recursively split array in half until size 1.
       Merge pairs of sorted arrays back together.
  Key insight: Merging two sorted arrays is O(n) — much cheaper than sorting.
  Guarantee: Always O(n log n) — no worst case.
  Cost: Requires O(n) extra memory.

QUICK SORT
  How: Pick a pivot. Partition so left side < pivot, right side > pivot.
       Recursively sort both sides.
  Key insight: Pivot ends up in its FINAL position after partition.
  Best/Avg: O(n log n) — excellent cache performance.
  Worst: O(n²) with bad pivot (e.g., always picking min/max on sorted input).
  Fix: Randomize pivot selection or use median-of-three.

LINEAR SEARCH
  How: Check each element one by one until you find the target.
  When to use: Unsorted arrays, tiny arrays, finding all occurrences.
  No precondition required (unlike binary search).

BINARY SEARCH
  How: Look at the middle element. If target is smaller, search left half.
       If larger, search right half. Repeat.
  Requirement: Array MUST be sorted.
  Power: 1,000,000 elements → max 20 comparisons. 1,000,000,000 → max 30!

BFS (Breadth-First Search)
  How: Use a queue. Visit a node, add all unvisited neighbors to queue.
       Process queue in FIFO order.
  Key property: Visits nodes level by level → finds SHORTEST PATH.
  Uses: GPS shortest path, social network "degrees of separation".

DFS (Depth-First Search)
  How: Use a stack (or recursion). Go as deep as possible along one path
       before backtracking and trying another.
  Key property: Explores deeply before broadly.
  Uses: Detecting cycles, topological sort, maze solving.


## ──────────────────────────────────────────────
## 6. RESUME DESCRIPTION
## ──────────────────────────────────────────────

── SHORT VERSION (for resume bullet) ──────────

• Built AlgoVis, a full-stack DSA visualization tool featuring 13 algorithms
  (sorting, searching, graph traversal, and data structures) with real-time
  step-by-step animation, Web Audio sound effects, and a dark futuristic UI
  using pure HTML/CSS/JavaScript — no frameworks. Deployed on GitHub Pages.

── MEDIUM VERSION (for projects section) ───────

AlgoVis — DSA Algorithm Visualizer | HTML · CSS · JavaScript
github.com/your-username/algovis | your-username.github.io/algovis

• Engineered an interactive visualization platform for 13 Data Structures &
  Algorithms including Bubble, Merge, Quick Sort, Binary Search, BFS, DFS,
  Stack, Queue, Linked List, and Binary Search Tree
• Implemented a frame-based animation engine with pause/resume, step-by-step
  execution, and variable-speed playback using the JavaScript event loop
• Built a Web Audio API sound engine that generates real-time audio feedback
  based on element values during sorting operations
• Designed a modular, MVC-inspired architecture with separate algorithm logic,
  rendering, and UI layers — enabling easy addition of new algorithms
• Created SVG-based graph and BST visualizers with animated traversal paths
  and node state highlighting
• Achieved responsive design supporting mobile, tablet, and desktop with CSS
  Grid and Flexbox; dark/light theme via CSS custom properties

── LONG VERSION (for LinkedIn / project showcase) ──

AlgoVis is a browser-based Data Structures and Algorithms visualizer I built
from scratch to deepen my DSA intuition and demonstrate frontend engineering
skills. The project required solving several interesting technical challenges:

ANIMATION ENGINE: I designed a "frame generator" pattern where each sorting
algorithm pre-computes all intermediate states as an array of frames, then a
renderer replays them at variable speed. This separates algorithm logic from
rendering and enables pause, step, and speed control without modifying the
algorithms themselves.

GRAPH VISUALIZATION: BFS and DFS are rendered on an interactive SVG canvas
with 10 nodes and 11 edges. Each traversal step updates node colors and edge
highlights in real time, with a live queue/stack display showing the algorithm's
internal state.

SOUND DESIGN: Used the Web Audio API to generate tones in real time — bar
height maps to frequency, creating a satisfying "musical" sorting experience
similar to those viral sorting algorithm videos.

BST RENDERER: The Binary Search Tree uses an in-order traversal layout
algorithm to assign pixel coordinates to nodes, then draws edges and circles
via SVG DOM manipulation. Insert, delete (all 3 cases), and search all animate
correctly with path highlighting.

TECH: Pure HTML5/CSS3/JavaScript (ES6+). No external JS libraries. Web Audio
API, Canvas API, SVG. Deployed on GitHub Pages.


## ──────────────────────────────────────────────
## 7. EXTENDING THE PROJECT
## ──────────────────────────────────────────────

Ideas to make it even more impressive:

1. ADD MORE ALGORITHMS:
   - Heap Sort, Shell Sort, Radix Sort, Counting Sort
   - Dijkstra's Shortest Path, A* Search
   - AVL Tree, Red-Black Tree

2. ADD FEATURES:
   - Import custom arrays (comma-separated input)
   - Record and replay animations (store frame arrays)
   - Side-by-side algorithm comparison (run two at once)
   - Benchmark mode: measure actual runtime for different sizes

3. IMPROVE PERFORMANCE:
   - Use requestAnimationFrame instead of setTimeout
   - Web Workers for heavy computation
   - WASM for even faster algorithm simulation

4. ACCESSIBILITY:
   - ARIA labels for all interactive elements
   - Keyboard navigation for all controls
   - High-contrast theme option

5. TESTS:
   - Unit tests for algorithm correctness (Jest)
   - Visual regression tests (Percy/Chromatic)
