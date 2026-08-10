/**
 * data.js — Algorithm metadata: descriptions, complexity, pseudocode, code
 * All algorithm info lives here for easy editing.
 */

const ALGO_DATA = {
  /* ── SORTING ── */
  bubble: {
    title: "Bubble Sort",
    category: "sorting",
    time: "O(n²)", space: "O(1)", best: "O(n)", avg: "O(n²)", worst: "O(n²)", stable: "✅ Yes",
    desc: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. Larger elements "bubble up" to the end on each pass. While simple to understand, it's inefficient on large datasets and mainly used for educational purposes.`,
    uses: ["Teaching sorting concepts", "Tiny arrays (< 20 elements)", "Nearly-sorted data detection"],
    pseudo: `BUBBLE-SORT(A):
  n = length(A)
  FOR i = 0 TO n-1:
    swapped = false
    FOR j = 0 TO n-i-2:
      IF A[j] > A[j+1]:
        SWAP(A[j], A[j+1])
        swapped = true
    IF NOT swapped:
      BREAK  // Already sorted`,
    code: {
      js: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // Optimisation: stop if sorted
  }
  return arr;
}`,
      py: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Already sorted
    return arr`,
      cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
    }
  },

  selection: {
    title: "Selection Sort",
    category: "sorting",
    time: "O(n²)", space: "O(1)", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", stable: "❌ No",
    desc: `Selection Sort divides the array into a sorted and unsorted region. It repeatedly selects the minimum element from the unsorted region and moves it to the end of the sorted region. It makes at most n-1 swaps, making it useful when writes are expensive.`,
    uses: ["When writes are costly", "Small arrays", "Memory-constrained environments"],
    pseudo: `SELECTION-SORT(A):
  n = length(A)
  FOR i = 0 TO n-1:
    minIdx = i
    FOR j = i+1 TO n-1:
      IF A[j] < A[minIdx]:
        minIdx = j
    SWAP(A[i], A[minIdx])`,
    code: {
      js: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      py: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}`
    }
  },

  insertion: {
    title: "Insertion Sort",
    category: "sorting",
    time: "O(n²)", space: "O(1)", best: "O(n)", avg: "O(n²)", worst: "O(n²)", stable: "✅ Yes",
    desc: `Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position. Like sorting playing cards in your hand — pick a card and insert it where it belongs. Very efficient for small or nearly-sorted data.`,
    uses: ["Small datasets", "Nearly sorted arrays", "Online algorithms (data arriving in stream)", "Base case of hybrid sorts (TimSort)"],
    pseudo: `INSERTION-SORT(A):
  FOR i = 1 TO length(A)-1:
    key = A[i]
    j = i - 1
    WHILE j >= 0 AND A[j] > key:
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key`,
    code: {
      js: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      py: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    }
  },

  merge: {
    title: "Merge Sort",
    category: "sorting",
    time: "O(n log n)", space: "O(n)", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", stable: "✅ Yes",
    desc: `Merge Sort uses divide-and-conquer: recursively split the array in half, sort each half, then merge them back together. Guaranteed O(n log n) in all cases makes it reliable for large datasets. Used in languages' standard library sort implementations.`,
    uses: ["Large datasets", "Linked lists", "External sorting (data on disk)", "Stable sort requirement"],
    pseudo: `MERGE-SORT(A, left, right):
  IF left < right:
    mid = (left + right) / 2
    MERGE-SORT(A, left, mid)
    MERGE-SORT(A, mid+1, right)
    MERGE(A, left, mid, right)

MERGE(A, left, mid, right):
  Create temp arrays L and R
  Copy A[left..mid] to L
  Copy A[mid+1..right] to R
  Merge L and R back into A`,
    code: {
      js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      py: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
      cpp: `void merge(int arr[], int l, int m, int r) {
    vector<int> L(arr+l,arr+m+1), R(arr+m+1,arr+r+1);
    int i=0,j=0,k=l;
    while(i<L.size()&&j<R.size())
        arr[k++]=L[i]<=R[j]?L[i++]:R[j++];
    while(i<L.size()) arr[k++]=L[i++];
    while(j<R.size()) arr[k++]=R[j++];
}
void mergeSort(int arr[],int l,int r){
    if(l<r){int m=(l+r)/2;mergeSort(arr,l,m);mergeSort(arr,m+1,r);merge(arr,l,m,r);}
}`
    }
  },

  quick: {
    title: "Quick Sort",
    category: "sorting",
    time: "O(n log n) avg", space: "O(log n)", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", stable: "❌ No",
    desc: `Quick Sort picks a pivot element and partitions the array so elements smaller than the pivot are on the left, larger on the right. It recursively sorts both sides. Fastest in practice for large datasets; widely used in system libraries.`,
    uses: ["General-purpose sorting", "System library sort (V8, libc)", "Large datasets with good pivot selection", "Cache-friendly sorting"],
    pseudo: `QUICKSORT(A, low, high):
  IF low < high:
    pivot = PARTITION(A, low, high)
    QUICKSORT(A, low, pivot-1)
    QUICKSORT(A, pivot+1, high)

PARTITION(A, low, high):
  pivot = A[high]
  i = low - 1
  FOR j = low TO high-1:
    IF A[j] <= pivot:
      i++; SWAP(A[i], A[j])
  SWAP(A[i+1], A[high])
  RETURN i+1`,
    code: {
      js: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      py: `def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
      cpp: `int partition(int arr[],int low,int high){
    int pivot=arr[high],i=low-1;
    for(int j=low;j<high;j++)
        if(arr[j]<=pivot) swap(arr[++i],arr[j]);
    swap(arr[i+1],arr[high]);
    return i+1;
}
void quickSort(int arr[],int low,int high){
    if(low<high){int pi=partition(arr,low,high);quickSort(arr,low,pi-1);quickSort(arr,pi+1,high);}
}`
    }
  },

  /* ── SEARCHING ── */
  linear: {
    title: "Linear Search",
    category: "searching",
    time: "O(n)", space: "O(1)", best: "O(1)", avg: "O(n)", worst: "O(n)", stable: "N/A",
    desc: `Linear Search checks each element one by one until the target is found or the array ends. Simple and works on unsorted data, but slow for large datasets. The go-to when the array is unsorted or very small.`,
    uses: ["Unsorted arrays", "Small datasets", "Finding all occurrences", "Linked list search"],
    pseudo: `LINEAR-SEARCH(A, target):
  FOR i = 0 TO length(A)-1:
    IF A[i] == target:
      RETURN i
  RETURN -1`,
    code: {
      js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // Not found
}`,
      py: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1  # Not found`,
      cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target) return i;
    return -1;
}`
    }
  },

  binary: {
    title: "Binary Search",
    category: "searching",
    time: "O(log n)", space: "O(1)", best: "O(1)", avg: "O(log n)", worst: "O(log n)", stable: "N/A",
    desc: `Binary Search works on sorted arrays by repeatedly halving the search space. Compare the middle element to the target — if smaller, search the right half; if larger, search the left half. Extremely fast: can search a million elements in just 20 comparisons.`,
    uses: ["Sorted arrays", "Database indexing", "Finding insertion point", "Debugging (git bisect)"],
    pseudo: `BINARY-SEARCH(A, target):
  low = 0, high = length(A)-1
  WHILE low <= high:
    mid = (low + high) / 2
    IF A[mid] == target:
      RETURN mid
    ELSE IF A[mid] < target:
      low = mid + 1
    ELSE:
      high = mid - 1
  RETURN -1`,
    code: {
      js: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      py: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
      cpp: `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    }
  },

  /* ── GRAPH ── */
  bfs: {
    title: "Breadth-First Search",
    category: "graph",
    time: "O(V + E)", space: "O(V)", best: "O(1)", avg: "O(V+E)", worst: "O(V+E)", stable: "N/A",
    desc: `BFS explores a graph level by level using a queue. It visits all neighbors of a node before moving deeper. Guarantees the shortest path in unweighted graphs. Used in social networks, GPS navigation, and web crawlers.`,
    uses: ["Shortest path (unweighted)", "Social network analysis", "Web crawling", "Level-order tree traversal"],
    pseudo: `BFS(graph, start):
  queue = [start]
  visited = {start}
  WHILE queue not empty:
    node = DEQUEUE(queue)
    PROCESS(node)
    FOR each neighbor of node:
      IF neighbor NOT in visited:
        visited.add(neighbor)
        ENQUEUE(queue, neighbor)`,
    code: {
      js: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      py: `from collections import deque
def bfs(graph, start):
    visited, queue, order = {start}, deque([start]), []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
      cpp: `vector<int> bfs(vector<vector<int>>& g, int start) {
    vector<bool> vis(g.size(), false);
    vector<int> order;
    queue<int> q;
    vis[start] = true; q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : g[u]) if (!vis[v]) { vis[v]=true; q.push(v); }
    }
    return order;
}`
    }
  },

  dfs: {
    title: "Depth-First Search",
    category: "graph",
    time: "O(V + E)", space: "O(V)", best: "O(1)", avg: "O(V+E)", worst: "O(V+E)", stable: "N/A",
    desc: `DFS explores as far as possible along each branch before backtracking, using a stack (or recursion). Great for detecting cycles, topological sorting, and solving mazes. Goes deep first, unlike BFS which goes wide.`,
    uses: ["Cycle detection", "Topological sort", "Maze solving", "Finding connected components", "Tree/graph traversal"],
    pseudo: `DFS(graph, start):
  stack = [start]
  visited = {}
  WHILE stack not empty:
    node = POP(stack)
    IF node NOT in visited:
      visited.add(node)
      PROCESS(node)
      FOR each neighbor of node:
        IF neighbor NOT in visited:
          PUSH(stack, neighbor)`,
    code: {
      js: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  function explore(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) explore(neighbor);
    }
  }
  explore(start);
  return order;
}`,
      py: `def dfs(graph, start, visited=None, order=None):
    if visited is None: visited, order = set(), []
    visited.add(start); order.append(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return order`,
      cpp: `void dfs(vector<vector<int>>& g, int u, vector<bool>& vis, vector<int>& order) {
    vis[u] = true; order.push_back(u);
    for (int v : g[u]) if (!vis[v]) dfs(g, v, vis, order);
}`
    }
  },

  /* ── DATA STRUCTURES ── */
  stack: {
    title: "Stack",
    category: "ds",
    time: "O(1) push/pop", space: "O(n)", best: "O(1)", avg: "O(1)", worst: "O(1)", stable: "N/A",
    desc: `A Stack is a LIFO (Last In, First Out) data structure. Think of a stack of plates — you can only add or remove from the top. Key operations: push (add), pop (remove), and peek (view top). Used for function call stacks, undo/redo, and expression evaluation.`,
    uses: ["Function call stack", "Undo/Redo functionality", "Expression evaluation", "Browser history", "Balanced parentheses check"],
    pseudo: `PUSH(stack, item): stack.top = item
POP(stack): return stack.top; remove top
PEEK(stack): return stack.top
IS-EMPTY(stack): return stack.size == 0`,
    code: {
      js: `class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() {
    if (this.isEmpty()) throw new Error("Underflow");
    return this.items.pop();
  }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}`,
      py: `class Stack:
    def __init__(self): self.items = []
    def push(self, item): self.items.append(item)
    def pop(self):
        if self.is_empty(): raise IndexError("Underflow")
        return self.items.pop()
    def peek(self): return self.items[-1]
    def is_empty(self): return len(self.items) == 0`,
      cpp: `class Stack {
    vector<int> items;
public:
    void push(int x) { items.push_back(x); }
    int pop() { int t=items.back(); items.pop_back(); return t; }
    int peek() { return items.back(); }
    bool isEmpty() { return items.empty(); }
};`
    }
  },

  queue: {
    title: "Queue",
    category: "ds",
    time: "O(1) enqueue/dequeue", space: "O(n)", best: "O(1)", avg: "O(1)", worst: "O(1)", stable: "N/A",
    desc: `A Queue is a FIFO (First In, First Out) data structure. Like a real-world queue/line — the first person to join is the first to leave. Key operations: enqueue (add to back), dequeue (remove from front). Used in BFS, scheduling, and async task queues.`,
    uses: ["BFS traversal", "Task scheduling", "Print queues", "Async message queues", "Buffering data streams"],
    pseudo: `ENQUEUE(queue, item): add item to back
DEQUEUE(queue): remove and return front
FRONT(queue): return front item
IS-EMPTY(queue): return queue.size == 0`,
    code: {
      js: `class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  dequeue() {
    if (this.isEmpty()) throw new Error("Underflow");
    return this.items.shift();
  }
  front() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}`,
      py: `from collections import deque
class Queue:
    def __init__(self): self.items = deque()
    def enqueue(self, item): self.items.append(item)
    def dequeue(self):
        if self.is_empty(): raise IndexError("Underflow")
        return self.items.popleft()
    def front(self): return self.items[0]
    def is_empty(self): return len(self.items) == 0`,
      cpp: `class Queue {
    queue<int> items;
public:
    void enqueue(int x) { items.push(x); }
    int dequeue() { int f=items.front(); items.pop(); return f; }
    int front() { return items.front(); }
    bool isEmpty() { return items.empty(); }
};`
    }
  },

  linkedlist: {
    title: "Linked List",
    category: "ds",
    time: "O(1) insert/delete at head", space: "O(n)", best: "O(1)", avg: "O(n)", worst: "O(n)", stable: "N/A",
    desc: `A Linked List is a linear data structure where each node holds a value and a pointer to the next node. Unlike arrays, elements aren't stored contiguously in memory — they're linked together. Great for dynamic insertion/deletion, but O(n) for random access.`,
    uses: ["Dynamic memory allocation", "Implementing stacks/queues", "Undo/Redo lists", "File systems (inode chains)", "Polynomial arithmetic"],
    pseudo: `INSERT-FRONT(list, val):
  node = new Node(val)
  node.next = list.head
  list.head = node

DELETE-FRONT(list):
  IF list.head == NULL: return
  list.head = list.head.next`,
    code: {
      js: `class Node { constructor(val) { this.val = val; this.next = null; } }
class LinkedList {
  constructor() { this.head = null; }
  prepend(val) {
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
  }
  deleteHead() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    return val;
  }
  toArray() {
    const arr = [];
    let cur = this.head;
    while (cur) { arr.push(cur.val); cur = cur.next; }
    return arr;
  }
}`,
      py: `class Node:
    def __init__(self, val): self.val = val; self.next = None
class LinkedList:
    def __init__(self): self.head = None
    def prepend(self, val):
        node = Node(val); node.next = self.head; self.head = node
    def delete_head(self):
        if not self.head: return None
        val = self.head.val; self.head = self.head.next; return val`,
      cpp: `struct Node { int val; Node* next; Node(int v):val(v),next(nullptr){} };
class LinkedList {
    Node* head = nullptr;
public:
    void prepend(int v) { Node* n=new Node(v); n->next=head; head=n; }
    int deleteHead() { if(!head) return -1; int v=head->val; head=head->next; return v; }
};`
    }
  },

  bst: {
    title: "Binary Search Tree",
    category: "ds",
    time: "O(log n) avg", space: "O(n)", best: "O(1)", avg: "O(log n)", worst: "O(n)", stable: "N/A",
    desc: `A Binary Search Tree (BST) is a tree where each node's left subtree contains only smaller values, and right subtree only larger values. This property enables fast O(log n) search, insert, and delete on average. Degrades to O(n) on skewed input — balanced BSTs (AVL, Red-Black) avoid this.`,
    uses: ["Database indexing", "Symbol tables (compilers)", "Priority queues", "In-order traversal = sorted output", "File system trees"],
    pseudo: `INSERT(node, val):
  IF node == NULL: return new Node(val)
  IF val < node.val: node.left = INSERT(node.left, val)
  ELSE: node.right = INSERT(node.right, val)
  RETURN node

SEARCH(node, val):
  IF node == NULL OR node.val == val: RETURN node
  IF val < node.val: RETURN SEARCH(node.left, val)
  RETURN SEARCH(node.right, val)`,
    code: {
      js: `class BSTNode { constructor(v) { this.val=v; this.left=this.right=null; } }
class BST {
  insert(root, val) {
    if (!root) return new BSTNode(val);
    if (val < root.val) root.left = this.insert(root.left, val);
    else if (val > root.val) root.right = this.insert(root.right, val);
    return root;
  }
  search(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val ? this.search(root.left,val) : this.search(root.right,val);
  }
  inorder(root, arr=[]) {
    if (root) { this.inorder(root.left,arr); arr.push(root.val); this.inorder(root.right,arr); }
    return arr;
  }
}`,
      py: `class BST:
    class Node:
        def __init__(self, v): self.val=v; self.left=self.right=None
    def __init__(self): self.root=None
    def insert(self, node, val):
        if not node: return self.Node(val)
        if val < node.val: node.left=self.insert(node.left, val)
        elif val > node.val: node.right=self.insert(node.right, val)
        return node
    def search(self, node, val):
        if not node or node.val==val: return node
        return self.search(node.left,val) if val<node.val else self.search(node.right,val)`,
      cpp: `struct BSTNode{int val;BSTNode*left,*right;BSTNode(int v):val(v),left(nullptr),right(nullptr){}};
BSTNode* insert(BSTNode* root,int v){
    if(!root) return new BSTNode(v);
    if(v<root->val) root->left=insert(root->left,v);
    else if(v>root->val) root->right=insert(root->right,v);
    return root;
}
BSTNode* search(BSTNode* root,int v){
    if(!root||root->val==v) return root;
    return v<root->val?search(root->left,v):search(root->right,v);
}`
    }
  }
};
