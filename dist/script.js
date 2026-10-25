const device = document.querySelector('#device');
const motionToggle = document.querySelector('#motionToggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reduced.matches;
let ticking = false;

function renderRotation() {
  if (!motionPaused && device) {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    const turn = progress * 520;
    const tilt = -3 + Math.sin(progress * Math.PI * 4) * 4;
    device.style.setProperty('--turn', `${turn}deg`);
    device.style.setProperty('--tilt', `${tilt}deg`);
  }
  ticking = false;
}

addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(renderRotation);
    ticking = true;
  }
}, { passive: true });

motionToggle?.addEventListener('click', () => {
  motionPaused = !motionPaused;
  motionToggle.setAttribute('aria-pressed', String(motionPaused));
  motionToggle.textContent = motionPaused ? 'Reanudar movimiento' : 'Pausar movimiento';
  if (!motionPaused) renderRotation();
});

reduced.addEventListener?.('change', event => {
  motionPaused = event.matches;
  motionToggle?.setAttribute('aria-pressed', String(motionPaused));
});

renderRotation();
