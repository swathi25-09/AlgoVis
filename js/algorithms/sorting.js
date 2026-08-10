/**
 * sorting.js — All sorting algorithm step generators
 * Each function returns an array of "frames" (snapshots) for animation.
 *
 * Frame structure:
 * { array, comparing:[], swapping:[], sorted:[], pivot:-1, left:-1, right:-1, desc:'' }
 */

const Sorting = (() => {

  /** Helper: deep-clone a frame object */
  function frame(arr, opts = {}) {
    return {
      array: [...arr],
      comparing: opts.comparing || [],
      swapping:  opts.swapping  || [],
      sorted:    opts.sorted    || [],
      pivot:     opts.pivot     ?? -1,
      left:      opts.left      ?? -1,
      right:     opts.right     ?? -1,
      desc:      opts.desc      || '',
    };
  }

  /* ── BUBBLE SORT ── */
  function bubble(inputArr) {
    const arr = [...inputArr];
    const frames = [];
    const n = arr.length;
    const sortedSet = new Set();

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        frames.push(frame(arr, { comparing: [j, j + 1], sorted: [...sortedSet], desc: `Comparing A[${j}]=${arr[j]} and A[${j+1}]=${arr[j+1]}` }));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          frames.push(frame(arr, { swapping: [j, j + 1], sorted: [...sortedSet], desc: `Swapping ${arr[j+1]} and ${arr[j]}` }));
          swapped = true;
        }
      }
      sortedSet.add(n - 1 - i);
      frames.push(frame(arr, { sorted: [...sortedSet], desc: `Pass ${i+1} complete — element ${arr[n-1-i]} is in its final position` }));
      if (!swapped) {
        for (let k = 0; k < n; k++) sortedSet.add(k);
        frames.push(frame(arr, { sorted: [...sortedSet], desc: 'No swaps in this pass — array is sorted!' }));
        break;
      }
    }
    // Mark everything sorted
    const allSorted = Array.from({ length: n }, (_, i) => i);
    frames.push(frame(arr, { sorted: allSorted, desc: '✅ Array fully sorted!' }));
    return frames;
  }

  /* ── SELECTION SORT ── */
  function selection(inputArr) {
    const arr = [...inputArr];
    const frames = [];
    const n = arr.length;
    const sortedSet = new Set();

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      frames.push(frame(arr, { current: i, sorted: [...sortedSet], desc: `Finding minimum in range [${i}, ${n-1}]` }));
      for (let j = i + 1; j < n; j++) {
        frames.push(frame(arr, { comparing: [minIdx, j], sorted: [...sortedSet], desc: `Comparing current min A[${minIdx}]=${arr[minIdx]} with A[${j}]=${arr[j]}` }));
        if (arr[j] < arr[minIdx]) { minIdx = j; }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        frames.push(frame(arr, { swapping: [i, minIdx], sorted: [...sortedSet], desc: `Placing minimum ${arr[i]} at index ${i}` }));
      }
      sortedSet.add(i);
      frames.push(frame(arr, { sorted: [...sortedSet], desc: `Position ${i} set — ${arr[i]} is final` }));
    }
    sortedSet.add(n - 1);
    frames.push(frame(arr, { sorted: [...sortedSet], desc: '✅ Array fully sorted!' }));
    return frames;
  }

  /* ── INSERTION SORT ── */
  function insertion(inputArr) {
    const arr = [...inputArr];
    const frames = [];
    const n = arr.length;
    const sortedSet = new Set([0]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      frames.push(frame(arr, { current: i, sorted: [...sortedSet], desc: `Inserting ${key} into the sorted portion` }));
      while (j >= 0 && arr[j] > key) {
        frames.push(frame(arr, { comparing: [j, j + 1], sorted: [...sortedSet], desc: `${arr[j]} > ${key}, shifting right` }));
        arr[j + 1] = arr[j];
        frames.push(frame(arr, { swapping: [j, j + 1], sorted: [...sortedSet], desc: `Moved ${arr[j]} to position ${j+1}` }));
        j--;
      }
      arr[j + 1] = key;
      sortedSet.add(i);
      frames.push(frame(arr, { sorted: [...sortedSet], desc: `Inserted ${key} at position ${j+1}` }));
    }
    frames.push(frame(arr, { sorted: Array.from({ length: n }, (_, i) => i), desc: '✅ Array fully sorted!' }));
    return frames;
  }

  /* ── MERGE SORT ── */
  function merge(inputArr) {
    const arr = [...inputArr];
    const frames = [];
    const n = arr.length;

    function mergeSort(lo, hi) {
      if (lo >= hi) return;
      const mid = Math.floor((lo + hi) / 2);
      mergeSort(lo, mid);
      mergeSort(mid + 1, hi);
      doMerge(lo, mid, hi);
    }

    function doMerge(lo, mid, hi) {
      const left = arr.slice(lo, mid + 1);
      const right = arr.slice(mid + 1, hi + 1);
      let i = 0, j = 0, k = lo;

      frames.push(frame(arr, { left: lo, right: hi, desc: `Merging ranges [${lo}-${mid}] and [${mid+1}-${hi}]` }));

      while (i < left.length && j < right.length) {
        frames.push(frame(arr, { comparing: [lo + i, mid + 1 + j], desc: `Comparing ${left[i]} and ${right[j]}` }));
        if (left[i] <= right[j]) { arr[k++] = left[i++]; }
        else { arr[k++] = right[j++]; }
        frames.push(frame(arr, { swapping: [k - 1], desc: `Placed ${arr[k-1]} at position ${k-1}` }));
      }
      while (i < left.length) { arr[k++] = left[i++]; frames.push(frame(arr, { swapping: [k-1] })); }
      while (j < right.length) { arr[k++] = right[j++]; frames.push(frame(arr, { swapping: [k-1] })); }
    }

    mergeSort(0, n - 1);
    frames.push(frame(arr, { sorted: Array.from({ length: n }, (_, i) => i), desc: '✅ Array fully sorted!' }));
    return frames;
  }

  /* ── QUICK SORT ── */
  function quick(inputArr) {
    const arr = [...inputArr];
    const frames = [];
    const n = arr.length;
    const sortedSet = new Set();

    function partition(lo, hi) {
      const pivotVal = arr[hi];
      let i = lo - 1;
      frames.push(frame(arr, { pivot: hi, sorted: [...sortedSet], desc: `Pivot = ${pivotVal} at index ${hi}` }));
      for (let j = lo; j < hi; j++) {
        frames.push(frame(arr, { comparing: [j, hi], pivot: hi, sorted: [...sortedSet], desc: `Comparing ${arr[j]} with pivot ${pivotVal}` }));
        if (arr[j] <= pivotVal) {
          i++;
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            frames.push(frame(arr, { swapping: [i, j], pivot: hi, sorted: [...sortedSet], desc: `Swapped ${arr[j]} and ${arr[i]}` }));
          }
        }
      }
      [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
      const pivotIdx = i + 1;
      sortedSet.add(pivotIdx);
      frames.push(frame(arr, { sorted: [...sortedSet], pivot: pivotIdx, desc: `Pivot ${arr[pivotIdx]} placed at final position ${pivotIdx}` }));
      return pivotIdx;
    }

    function qs(lo, hi) {
      if (lo < hi) {
        const pi = partition(lo, hi);
        qs(lo, pi - 1);
        qs(pi + 1, hi);
      } else if (lo === hi) {
        sortedSet.add(lo);
      }
    }

    qs(0, n - 1);
    frames.push(frame(arr, { sorted: Array.from({ length: n }, (_, i) => i), desc: '✅ Array fully sorted!' }));
    return frames;
  }

  return { bubble, selection, insertion, merge, quick };
})();
