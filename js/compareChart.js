/**
 * compareChart.js — Canvas-based performance comparison chart
 * Shows relative complexity of all sorting algorithms
 */

const CompareChart = (() => {
  const algorithms = [
    { name: 'Bubble',    best: 1, avg: 5, worst: 5, color: '#ff6b35' },
    { name: 'Selection', best: 5, avg: 5, worst: 5, color: '#ff3366' },
    { name: 'Insertion', best: 1, avg: 4, worst: 4, color: '#ffd700' },
    { name: 'Merge',     best: 3, avg: 3, worst: 3, color: '#00d4ff' },
    { name: 'Quick',     best: 3, avg: 3, worst: 5, color: '#8b5cf6' },
  ];

  // Score: 1 = O(n), 2 = O(n log n)... 5 = O(n²) — higher = worse
  const labels = { 1: 'O(n)', 2: 'O(n√n)', 3: 'O(n log n)', 4: 'O(n^1.5)', 5: 'O(n²)' };

  function draw() {
    const canvas = document.getElementById('compareChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const padL = 10, padR = 10, padT = 24, padB = 20;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.roundRect(0, 0, W, H, 8);
    ctx.fill();

    // Title
    ctx.fillStyle = '#6a8fba';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('WORST CASE ▸', padL, 12);
    ctx.textAlign = 'right';
    ctx.fillText('◂ BEST CASE', W - padR, 12);

    const groupW = chartW / algorithms.length;
    const barW = groupW * 0.22;
    const maxScore = 5;

    algorithms.forEach((algo, i) => {
      const gx = padL + i * groupW;

      // Draw 3 bars: best, avg, worst
      const bars = [
        { score: algo.best,  alpha: 0.5,  label: 'B' },
        { score: algo.avg,   alpha: 0.75, label: 'A' },
        { score: algo.worst, alpha: 1.0,  label: 'W' },
      ];

      bars.forEach((bar, bi) => {
        const bx = gx + bi * (barW + 2) + groupW * 0.06;
        const bh = (bar.score / maxScore) * chartH;
        const by = padT + chartH - bh;

        // Glow effect
        ctx.shadowColor = algo.color;
        ctx.shadowBlur = 6;

        // Bar fill
        const grad = ctx.createLinearGradient(bx, by, bx, by + bh);
        grad.addColorStop(0, algo.color + Math.round(bar.alpha * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(1, algo.color + '22');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, bh, [2, 2, 0, 0]);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Algorithm name
      ctx.fillStyle = algo.color;
      ctx.font = 'bold 8px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(algo.name, gx + groupW / 2, H - 6);
    });

    // Draw legend
    const legendEl = document.getElementById('chartLegend');
    if (legendEl) {
      legendEl.innerHTML = algorithms.map(a =>
        `<div class="legend-dot"><span style="background:${a.color}"></span>${a.name}</div>`
      ).join('');
    }
  }

  return { draw };
})();
