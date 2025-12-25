const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Reduce load on mobile
const isMobile = window.innerWidth < 768;
const DOT_COUNT = isMobile ? 35 : 80;
const MAX_DISTANCE = 120;

const dots = [];

for (let i = 0; i < DOT_COUNT; i++) {
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
    vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
    r: Math.random() * 2 + 1,
    alpha: Math.random()
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  // Draw dots
  dots.forEach(dot => {
    dot.x += dot.vx;
    dot.y += dot.vy;
    dot.alpha += (Math.random() - 0.5) * 0.02;

    if (dot.alpha < 0.2) dot.alpha = 0.2;
    if (dot.alpha > 1) dot.alpha = 1;

    if (dot.x < 0 || dot.x > w) dot.vx *= -1;
    if (dot.y < 0 || dot.y > h) dot.vy *= -1;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56, 189, 248, ${dot.alpha})`;
    ctx.fill();
  });

  // Draw connecting lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / MAX_DISTANCE})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
