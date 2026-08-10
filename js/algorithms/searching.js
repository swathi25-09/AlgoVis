/**
 * searching.js — Linear and Binary search step generators
 */

const Searching = (() => {

  function frame(arr, opts = {}) {
    return {
      array: [...arr],
      current:  opts.current  ?? -1,
      found:    opts.found    ?? -1,
      low:      opts.low      ?? -1,
      high:     opts.high     ?? -1,
      mid:      opts.mid      ?? -1,
      eliminated: opts.eliminated || [],
      desc:     opts.desc     || '',
      status:   opts.status   || 'running', // 'running' | 'found' | 'notfound'
    };
  }

  /* ── LINEAR SEARCH ── */
  function linear(inputArr, target) {
    const arr = [...inputArr];
    const frames = [];
    const eliminated = [];

    frames.push(frame(arr, { desc: `Linear Search for target = ${target}` }));

    for (let i = 0; i < arr.length; i++) {
      frames.push(frame(arr, {
        current: i,
        eliminated: [...eliminated],
        desc: `Checking index ${i}: A[${i}] = ${arr[i]} — is it ${target}?`
      }));

      if (arr[i] === target) {
        frames.push(frame(arr, {
          found: i,
          eliminated: [...eliminated],
          status: 'found',
          desc: `✅ Found ${target} at index ${i}!`
        }));
        return frames;
      }
      eliminated.push(i);
    }

    frames.push(frame(arr, {
      eliminated: [...eliminated],
      status: 'notfound',
      desc: `❌ ${target} not found in the array.`
    }));
    return frames;
  }

  /* ── BINARY SEARCH ── */
  function binary(sortedArr, target) {
    const arr = [...sortedArr].sort((a, b) => a - b); // ensure sorted
    const frames = [];
    const eliminated = [];
    let low = 0, high = arr.length - 1;

    frames.push(frame(arr, {
      low, high,
      desc: `Binary Search for ${target} — array must be sorted. low=${low}, high=${high}`
    }));

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      frames.push(frame(arr, {
        low, high, mid,
        eliminated: [...eliminated],
        desc: `mid = ${mid}, A[mid] = ${arr[mid]}. Comparing with target ${target}`
      }));

      if (arr[mid] === target) {
        frames.push(frame(arr, {
          found: mid, low, high, mid,
          eliminated: [...eliminated],
          status: 'found',
          desc: `✅ Found ${target} at index ${mid}!`
        }));
        return frames;
      } else if (arr[mid] < target) {
        // Eliminate left half
        for (let i = low; i <= mid; i++) eliminated.push(i);
        frames.push(frame(arr, {
          low, high, mid,
          eliminated: [...eliminated],
          desc: `${arr[mid]} < ${target} → search RIGHT half (low = ${mid + 1})`
        }));
        low = mid + 1;
      } else {
        // Eliminate right half
        for (let i = mid; i <= high; i++) eliminated.push(i);
        frames.push(frame(arr, {
          low, high, mid,
          eliminated: [...eliminated],
          desc: `${arr[mid]} > ${target} → search LEFT half (high = ${mid - 1})`
        }));
        high = mid - 1;
      }
    }

    frames.push(frame(arr, {
      eliminated: [...eliminated],
      status: 'notfound',
      desc: `❌ ${target} not found. Search space exhausted.`
    }));
    return frames;
  }

  return { linear, binary };
})();
