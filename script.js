/* ==============================================================================
   LÓGICA INTERACTIVA — FLORES AMARILLAS & STRAY KIDS (BANG CHAN / WOLF CHAN)
   100% Vanilla JS + Canvas 60fps + Web Audio API + 3D Parallax Photocard
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPetalCanvas();
  initAudioSynthesizer();
  initGarden();
  initPhotocard3D();
  initMusicPlayer();
  initSecretEnvelope();
  initWolfChanPetting();
  initBangChanHug();
  initBouquetModal();
});

/* ==============================================================================
   1. BACKGROUND CANVAS: PÉTALOS AMARILLOS Y DESTELLOS FLOTANTES (60 FPS)
   ============================================================================== */
function initPetalCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const sparkles = [];
  const petalCount = window.innerWidth < 768 ? 26 : 48;
  const sparkleCount = window.innerWidth < 768 ? 22 : 38;

  const petalColors = [
    'rgba(250, 204, 21, 0.85)',  // Amarillo brillante
    'rgba(253, 224, 71, 0.80)',  // Amarillo pastel
    'rgba(254, 240, 138, 0.75)', // Miel suave
    'rgba(251, 191, 36, 0.85)',  // Ámbar
    'rgba(252, 231, 243, 0.70)', // Rosa coquette
    'rgba(244, 114, 182, 0.60)'  // Rubor rosa suave
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -25;
      this.size = Math.random() * 13 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2.2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    }
    update() {
      this.y += this.speedY;
      this.swayOffset += this.swaySpeed;
      this.x += Math.sin(this.swayOffset) * 1.3 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > height + 30 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, this.size / 2, 0, this.size);
      ctx.bezierCurveTo(this.size / 2, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.6 + 1;
      this.alpha = Math.random();
      this.fadeSpeed = Math.random() * 0.02 + 0.008;
      this.growing = Math.random() > 0.5;
    }
    update() {
      if (this.growing) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= 0.9) this.growing = false;
      } else {
        this.alpha -= this.fadeSpeed;
        if (this.alpha <= 0.1) {
          this.growing = true;
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        }
      }
    }
    draw() {
      ctx.save();
      ctx.fillStyle = `rgba(253, 224, 71, ${this.alpha})`;
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) petals.push(new Petal());
  for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    sparkles.forEach((s) => {
      s.update();
      s.draw();
    });
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==============================================================================
   2. SINTETIZADOR WEB AUDIO API (CHIMES DULCES & EFECTOS ACÚSTICOS)
   ============================================================================== */
let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playBloomChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Notas de campana dulce arpegiada (Pentatónica Mayor)
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5, D5, E5, G5, A5, C6
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomFreq, now);
    osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.25, now + 0.35);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch (e) {}
}

function playEnvelopePop() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {}
}

function playPetSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.18); // B5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {}
}

function initAudioSynthesizer() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIconOn = document.getElementById('soundIconOn');
  const soundIconOff = document.getElementById('soundIconOff');
  const shareBtn = document.getElementById('shareAppBtn');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      const audioEl = document.getElementById('skzAudio');
      if (audioEl) audioEl.muted = isMuted;
      if (soundIconOn) soundIconOn.classList.toggle('hidden', isMuted);
      if (soundIconOff) soundIconOff.classList.toggle('hidden', !isMuted);
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('✨ ¡Enlace copiado al portapapeles! Ya puedes enviárselo para alegrarle su día 💛');
        }).catch(() => {
          alert('¡Copia el enlace de la barra del navegador para compartir tu detalle!');
        });
      }
    });
  }
}

/* ==============================================================================
   3. JARDÍN INTERACTIVO DE FLORES AMARILLAS & CUMPLIDOS TIERNOS
   ============================================================================== */
const flowerSVGs = [
  // Girasol alegre
  `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
     <path d="M50 70 L50 98" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
     <path d="M50 82 Q65 75 60 90" fill="#22c55e" />
     <path d="M50 85 Q35 78 40 93" fill="#22c55e" />
     <g fill="#facc15" stroke="#eab308" stroke-width="1.2">
       <ellipse cx="50" cy="22" rx="7" ry="16"/>
       <ellipse cx="50" cy="78" rx="7" ry="16"/>
       <ellipse cx="22" cy="50" rx="16" ry="7"/>
       <ellipse cx="78" cy="50" rx="16" ry="7"/>
       <ellipse cx="30" cy="30" rx="16" ry="7" transform="rotate(45 30 30)"/>
       <ellipse cx="70" cy="70" rx="16" ry="7" transform="rotate(45 70 70)"/>
       <ellipse cx="70" cy="30" rx="16" ry="7" transform="rotate(-45 70 30)"/>
       <ellipse cx="30" cy="70" rx="16" ry="7" transform="rotate(-45 30 70)"/>
     </g>
     <circle cx="50" cy="50" r="16" fill="#854d0e" stroke="#713f12" stroke-width="2"/>
     <circle cx="50" cy="50" r="11" fill="#a16207" />
     <circle cx="47" cy="47" r="2.5" fill="#fef08a" opacity="0.7"/>
   </svg>`,

  // Margarita dorada
  `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
     <path d="M50 68 L50 98" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/>
     <path d="M50 80 Q62 76 58 88" fill="#16a34a"/>
     <g fill="#fde047" stroke="#ca8a04" stroke-width="1">
       <circle cx="50" cy="24" r="8"/>
       <circle cx="50" cy="76" r="8"/>
       <circle cx="24" cy="50" r="8"/>
       <circle cx="76" cy="50" r="8"/>
       <circle cx="32" cy="32" r="8"/>
       <circle cx="68" cy="68" r="8"/>
       <circle cx="68" cy="32" r="8"/>
       <circle cx="32" cy="68" r="8"/>
     </g>
     <circle cx="50" cy="50" r="14" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
     <circle cx="48" cy="48" r="3" fill="#fff" opacity="0.85"/>
   </svg>`,

  // Tulipán amarillo de primavera
  `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
     <path d="M50 60 L50 98" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/>
     <path d="M50 78 Q30 70 38 90" fill="#22c55e"/>
     <path d="M50 72 Q70 65 62 85" fill="#22c55e"/>
     <g fill="#fde047" stroke="#eab308" stroke-width="1.5">
       <path d="M30 45 C30 65 70 65 70 45 C70 30 60 22 50 40 C40 22 30 30 30 45 Z" fill="#facc15"/>
       <path d="M40 38 C40 60 60 60 60 38 C60 25 50 18 50 35 C50 18 40 25 40 38 Z" fill="#fef08a" opacity="0.95"/>
     </g>
   </svg>`
];

const flowerCompliments = [
  'Tus diseños de uñas son arte puro 💅✨',
  'Tus outfits neutros transmiten una paz hermosa 🕊️',
  'Me derrite verte tímida cuando te trato bonito 🥺💛',
  'Eres el bombón más hermoso y tierno 🍬✨',
  'Tu sonrisa ilumina más que el sol de septiembre 🌻',
  'Wolf Chan te manda un besito en la nariz 🐺💛',
  'Bang Chan dice: You make Stray Kids Stay! 🌟',
  'Flores eternas que nunca se marchitan para ti 🌼',
  'Gracias por existir y ser tan increíble 💛',
  'Tu vibra relajante es un refugio de calma 🕊️',
  'Abrazo apretado y cariñoso para ti hoy 🤗💛',
  '21 de Septiembre: ¡Tus flores amarillas! 🌼'
];

let flowerCount = 0;
const milestones = [
  { count: 1, title: '🌱 La primera flor', desc: 'Para mi bombón: para empezar a llenar tu día de sonrisas.' },
  { count: 5, title: '✨ Un toque de calma', desc: 'Un ramito para alguien que transmite tanta paz como tú.' },
  { count: 10, title: '🐺 Mimos de Wolf Chan', desc: 'Wolf Chan dice: "Hoy te toca relajarte y dejarte consentir."' },
  { count: 21, title: '🌟 ¡21 Flores de Septiembre!', desc: '¡Has completado las 21 flores amarillas para la chica más linda! 💛' }
];

function initGarden() {
  const gardenArea = document.getElementById('gardenArea');
  const waterBtn = document.getElementById('waterGardenBtn');
  const bloomAllBtn = document.getElementById('bloomAllBtn');
  const countEl = document.getElementById('flowerCounter');
  const progressBar = document.getElementById('gardenProgressBar');
  const emptyHint = document.getElementById('gardenEmptyHint');
  const milestoneToast = document.getElementById('milestoneToast');
  const milestoneTitle = document.getElementById('milestoneTitle');
  const milestoneDesc = document.getElementById('milestoneDesc');
  const closeToastBtn = document.getElementById('closeToastBtn');

  function plantFlower(x = null, y = null, isAuto = false) {
    if (!gardenArea) return;
    flowerCount++;
    if (countEl) countEl.innerText = flowerCount;

    if (emptyHint && flowerCount > 0) {
      emptyHint.style.display = 'none';
    }

    const progressPercent = Math.min(100, (flowerCount / 21) * 100);
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const flowerWrapper = document.createElement('div');
    flowerWrapper.className = 'flower-bloom absolute select-none cursor-pointer';

    const size = Math.floor(Math.random() * 24) + 50; // 50px - 74px
    flowerWrapper.style.width = `${size}px`;
    flowerWrapper.style.height = `${size}px`;

    const rect = gardenArea.getBoundingClientRect();
    const posX = x !== null ? x - rect.left - size / 2 : Math.random() * (rect.width - size - 20) + 10;
    const posY = y !== null ? y - rect.top - size / 2 : Math.random() * (rect.height - size - 20) + 10;

    const clampX = Math.max(10, Math.min(rect.width - size - 10, posX));
    const clampY = Math.max(10, Math.min(rect.height - size - 10, posY));

    flowerWrapper.style.left = `${clampX}px`;
    flowerWrapper.style.top = `${clampY}px`;

    const randomSVG = flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];
    flowerWrapper.innerHTML = randomSVG;

    gardenArea.appendChild(flowerWrapper);

    // Burbuja de cumplido tierno
    if (!isAuto) {
      const bubble = document.createElement('div');
      bubble.className = 'flower-love-bubble glass-pill px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 shadow-md border border-yellow-300';
      const randomCompliment = flowerCompliments[Math.floor(Math.random() * flowerCompliments.length)];
      bubble.innerText = randomCompliment;
      flowerWrapper.appendChild(bubble);

      setTimeout(() => {
        if (bubble.parentNode) bubble.remove();
      }, 3200);
    }

    // Sonido y mini confetti
    playBloomChime();
    triggerMiniConfetti(clampX + rect.left + size / 2, clampY + rect.top + size / 2);

    // Verificar hito
    checkMilestone(flowerCount);
  }

  function checkMilestone(count) {
    const milestone = milestones.find((m) => m.count === count);
    if (milestone && milestoneToast && milestoneTitle && milestoneDesc) {
      milestoneTitle.innerText = milestone.title;
      milestoneDesc.innerText = milestone.desc;
      milestoneToast.classList.remove('hidden');

      if (window.confetti) {
        window.confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#facc15', '#fde047', '#f472b6', '#ffffff', '#eab308']
        });
      }

      setTimeout(() => {
        if (milestoneToast) milestoneToast.classList.add('hidden');
      }, 6000);
    }

    // Al llegar a 21: ¡Gran Celebración del Ramo!
    if (count === 21) {
      setTimeout(() => {
        openBouquetModal();
      }, 800);
    }
  }

  if (closeToastBtn && milestoneToast) {
    closeToastBtn.addEventListener('click', () => {
      milestoneToast.classList.add('hidden');
    });
  }

  if (waterBtn) {
    waterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      plantFlower();
    });
  }

  if (bloomAllBtn) {
    bloomAllBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const flowersRemaining = Math.max(1, 21 - flowerCount);
      let countPlanted = 0;
      const interval = setInterval(() => {
        plantFlower(null, null, true);
        countPlanted++;
        if (countPlanted >= flowersRemaining || flowerCount >= 21) {
          clearInterval(interval);
        }
      }, 100);
    });
  }

  if (gardenArea) {
    gardenArea.addEventListener('click', (e) => {
      plantFlower(e.clientX, e.clientY);
    });
  }

  // Flores iniciales
  setTimeout(() => {
    plantFlower(null, null, true);
    plantFlower(null, null, true);
    plantFlower(null, null, true);
  }, 400);
}

function triggerMiniConfetti(x, y) {
  if (!window.confetti) return;
  const originX = x / window.innerWidth;
  const originY = y / window.innerHeight;
  window.confetti({
    particleCount: 16,
    spread: 45,
    startVelocity: 16,
    ticks: 55,
    origin: { x: originX, y: originY },
    colors: ['#facc15', '#fde047', '#fb7185', '#ffffff']
  });
}

/* ==============================================================================
   4. PHOTOCARD 3D DE COLECCIÓN (BANG CHAN & WOLF CHAN)
   Tilt desacoplado del Flip 180° (Solución a conflicto de especificidad)
   ============================================================================== */
function initPhotocard3D() {
  const container = document.getElementById('photocardContainer');
  const tiltWrapper = document.getElementById('photocardTiltWrapper');
  const innerCard = document.getElementById('photocardInner');
  const holoOverlay = document.getElementById('holoOverlay');
  const flipBtn = document.getElementById('flipCardBtn');

  if (!container || !tiltWrapper || !innerCard) return;

  let isFlipped = false;

  function toggleFlip() {
    isFlipped = !isFlipped;
    innerCard.classList.toggle('is-flipped', isFlipped);
    playEnvelopePop();

    if (window.confetti) {
      window.confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#facc15', '#f472b6', '#ffffff']
      });
    }
  }

  if (flipBtn) flipBtn.addEventListener('click', toggleFlip);

  // Parallax Tilt 3D suave en el tiltWrapper (sin colisionar con el rotateY de la tarjeta)
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    tiltWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Efecto de reflejo holográfico tornasolado interactivo
    if (holoOverlay) {
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
      holoOverlay.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,215,0,0.4) 25%, rgba(255,105,180,0.3) 50%, rgba(56,189,248,0.3) 75%, rgba(255,255,255,0) 100%)`;
      holoOverlay.style.opacity = '0.85';
    }
  });

  container.addEventListener('mouseleave', () => {
    tiltWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (holoOverlay) holoOverlay.style.opacity = '0.55';
  });

  // Clic directo en la tarjeta para voltear
  container.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
      toggleFlip();
    }
  });
}

/* ==============================================================================
   5. REPRODUCTOR CHAN'S MUSIC ROOM CON CARÁTULAS DINÁMICAS Y TABS
   ============================================================================== */
function initMusicPlayer() {
  const audioEl = document.getElementById('skzAudio');
  const playBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const trackCover = document.getElementById('trackCover');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const trackBadge = document.getElementById('trackBadge');
  const trackQuote = document.getElementById('trackQuote');
  const equalizer = document.getElementById('equalizerBars');
  const progressBar = document.getElementById('playerProgress');
  const progressContainer = document.getElementById('playerProgressContainer');
  const currentTimeEl = document.getElementById('playerCurrentTime');
  const totalTimeEl = document.getElementById('playerTotalTime');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const loopTrackBtn = document.getElementById('loopTrackBtn');
  const heartBtn = document.getElementById('favoriteHeartBtn');
  const volumeSlider = document.getElementById('volumeSlider');

  const tab0 = document.getElementById('trackTab0');
  const tab1 = document.getElementById('trackTab1');
  const tab2 = document.getElementById('trackTab2');
  const trackTabs = [tab0, tab1, tab2];

  let isPlaying = false;
  let isLooping = false;
  let currentTrackIdx = 0;

  const playlist = [
    {
      title: 'Youtiful',
      artist: 'Stray Kids (스트레이 키즈)',
      src: 'assets/youtiful.mp3',
      cover: 'assets/wolfchan.jpg',
      badge: 'Canción Oficial • Stray Kids',
      quote: '"You are beautiful just the way you are... never forget it 🌸"'
    },
    {
      title: 'Connected',
      artist: 'Bang Chan (방찬 - Stray Kids)',
      src: 'assets/connected.mp3',
      cover: 'assets/bangchan.jpg',
      badge: 'Bang Chan Solo • SKZ-RECORD',
      quote: '"We’re always connected, no matter where you are 🐺💛"'
    },
    {
      title: 'Hug Me (안아줄게요)',
      artist: 'I.N & Bang Chan (Stray Kids)',
      src: 'assets/hugme.mp3',
      cover: 'assets/wolfchan.jpg',
      badge: 'I.N & Bang Chan • SKZ-RECORD',
      quote: '"Whenever you feel overwhelmed, I will hold you tight 🐾💛"'
    }
  ];

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateTrackUI() {
    const track = playlist[currentTrackIdx];
    if (trackTitle) trackTitle.innerText = track.title;
    if (trackArtist) trackArtist.innerText = track.artist;
    if (trackBadge) trackBadge.innerText = track.badge;
    if (trackQuote) trackQuote.innerText = track.quote;
    if (trackCover) trackCover.src = track.cover;

    // Actualizar estilo de tabs
    trackTabs.forEach((tab, idx) => {
      if (!tab) return;
      if (idx === currentTrackIdx) {
        tab.className = 'track-tab py-1.5 px-2 rounded-lg text-xs font-bold transition-all bg-yellow-400 text-yellow-950 shadow-sm';
      } else {
        tab.className = 'track-tab py-1.5 px-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-amber-900 transition-all';
      }
    });

    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.innerText = '0:00';
    if (totalTimeEl) totalTimeEl.innerText = '--:--';
  }

  if (audioEl) {
    audioEl.volume = volumeSlider ? parseFloat(volumeSlider.value) : 0.8;
    audioEl.src = playlist[currentTrackIdx].src;

    audioEl.addEventListener('loadedmetadata', () => {
      if (totalTimeEl && !isNaN(audioEl.duration)) {
        totalTimeEl.innerText = formatTime(audioEl.duration);
      }
    });

    audioEl.addEventListener('timeupdate', () => {
      if (currentTimeEl) currentTimeEl.innerText = formatTime(audioEl.currentTime);
      if (totalTimeEl && !isNaN(audioEl.duration)) totalTimeEl.innerText = formatTime(audioEl.duration);
      if (progressBar && audioEl.duration) {
        const percent = (audioEl.currentTime / audioEl.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }
    });

    audioEl.addEventListener('ended', () => {
      if (!isLooping) {
        switchTrack(1);
      }
    });
  }

  // Adelantar / retroceder en la barra
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audioEl && audioEl.duration) {
        audioEl.currentTime = ratio * audioEl.duration;
      }
    });
  }

  function startPlayback() {
    isPlaying = true;
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
    if (equalizer) equalizer.classList.remove('paused');
    if (trackCover) trackCover.classList.add('animate-spin-album');

    if (audioEl) {
      audioEl.muted = isMuted;
      audioEl.play().catch(() => {});
    }
  }

  function stopPlayback() {
    isPlaying = false;
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (equalizer) equalizer.classList.add('paused');
    if (trackCover) trackCover.classList.remove('animate-spin-album');

    if (audioEl) audioEl.pause();
  }

  function togglePlay() {
    getAudioContext();
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  function switchTrack(direction) {
    const wasPlaying = isPlaying;
    stopPlayback();

    currentTrackIdx = (currentTrackIdx + direction + playlist.length) % playlist.length;
    updateTrackUI();

    if (audioEl) {
      audioEl.src = playlist[currentTrackIdx].src;
      audioEl.load();
    }

    if (wasPlaying) {
      startPlayback();
    }
  }

  function selectTrackByIndex(idx) {
    if (idx === currentTrackIdx && isPlaying) return;
    const wasPlaying = isPlaying;
    stopPlayback();

    currentTrackIdx = idx;
    updateTrackUI();

    if (audioEl) {
      audioEl.src = playlist[currentTrackIdx].src;
      audioEl.load();
    }

    if (wasPlaying || true) {
      startPlayback();
    }
  }

  // Tabs de selección directa
  trackTabs.forEach((tab, idx) => {
    if (tab) {
      tab.addEventListener('click', () => selectTrackByIndex(idx));
    }
  });

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => switchTrack(1));
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => switchTrack(-1));

  if (loopTrackBtn) {
    loopTrackBtn.addEventListener('click', () => {
      isLooping = !isLooping;
      if (audioEl) audioEl.loop = isLooping;
      loopTrackBtn.classList.toggle('text-amber-600', isLooping);
      loopTrackBtn.classList.toggle('text-gray-400', !isLooping);
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      if (audioEl) audioEl.volume = parseFloat(volumeSlider.value);
    });
  }

  if (heartBtn) {
    let liked = false;
    heartBtn.addEventListener('click', () => {
      liked = !liked;
      heartBtn.classList.toggle('text-rose-500', liked);
      heartBtn.classList.toggle('text-gray-400', !liked);
      if (liked && window.confetti) {
        window.confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.75 },
          colors: ['#f43f5e', '#fb7185', '#facc15']
        });
      }
    });
  }
}

/* ==============================================================================
   6. BUZÓN DE MENSAJE SECRETO (SOBRE CON SELLO DE CERA Y CARTA RESPONSIVE)
   ============================================================================== */
function initSecretEnvelope() {
  const closedContainer = document.getElementById('envelopeClosedContainer');
  const openContainer = document.getElementById('envelopeOpenContainer');
  const waxSeal = document.getElementById('waxSeal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');
  const copyLetterBtn = document.getElementById('copyLetterBtn');
  const editLetterBtn = document.getElementById('editLetterBtn');
  const letterRecipient = document.getElementById('letterRecipient');
  const letterBody = document.getElementById('letterBody');

  // Cargar nombre guardado en LocalStorage si existe
  const savedRecipient = localStorage.getItem('skz_yellow_recipient');
  if (savedRecipient && letterRecipient) {
    letterRecipient.innerText = savedRecipient;
  }

  function openLetter() {
    if (!closedContainer || !openContainer) return;
    playEnvelopePop();

    closedContainer.classList.add('open');
    setTimeout(() => {
      closedContainer.classList.add('hidden');
      openContainer.classList.remove('hidden');

      // Desplazamiento suave para centrar la carta
      openContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (window.confetti) {
        window.confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#facc15', '#fde047', '#f472b6', '#ffffff', '#eab308']
        });
      }
    }, 450);
  }

  function closeLetter() {
    if (!closedContainer || !openContainer) return;
    openContainer.classList.add('hidden');
    closedContainer.classList.remove('hidden');
    setTimeout(() => {
      closedContainer.classList.remove('open');
      closedContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  if (waxSeal) waxSeal.addEventListener('click', openLetter);
  if (closedContainer) {
    closedContainer.addEventListener('click', (e) => {
      if (!e.target.closest('button')) openLetter();
    });
  }
  if (closeLetterBtn) closeLetterBtn.addEventListener('click', closeLetter);

  // Copiar carta al portapapeles
  if (copyLetterBtn && letterBody && letterRecipient) {
    copyLetterBtn.addEventListener('click', () => {
      const fullText = `${letterRecipient.innerText}\n\n${letterBody.innerText}\n\n— Con todo mi cariño siempre para ti 🐾 (Stay Safe • You Make Stray Kids Stay)`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
          alert('💛 ¡Carta copiada al portapapeles con éxito! Puedes guardarla donde quieras.');
        });
      }
    });
  }

  // Personalizar nombre
  if (editLetterBtn) {
    editLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentName = letterRecipient ? letterRecipient.innerText.replace('Para: ', '').replace(' 💛', '') : '';
      const newName = prompt('¿Cómo quieres que diga la dedicatoria? (Escribe su nombre o apodo):', currentName);
      if (newName && newName.trim() !== '') {
        const formatted = `Para: ${newName.trim()} 💛`;
        if (letterRecipient) letterRecipient.innerText = formatted;
        localStorage.setItem('skz_yellow_recipient', formatted);

        if (window.confetti) {
          window.confetti({
            particleCount: 35,
            spread: 50,
            colors: ['#facc15', '#fb7185']
          });
        }
      }
    });
  }
}

/* ==============================================================================
   7. WOLF CHAN INTERACTIVO (CARICIAS, MIMOS Y FRASES TIERNAS)
   ============================================================================== */
function initWolfChanPetting() {
  const avatar = document.getElementById('wolfChanAvatar');
  const dialogue = document.getElementById('wolfChanDialogue');
  const petCounter = document.getElementById('wolfChanPetCounter');
  const heartsContainer = document.getElementById('wolfChanHeartsContainer');
  const moodIcon = document.getElementById('wolfChanMoodIcon');

  if (!avatar) return;

  let mimosCount = 0;
  let lastPhraseIdx = -1;

  const cutePhrases = [
    '¡Amo cuando me acaricias, bombón! Eres la persona más linda de este mundo 🐺💛',
    '¡Miau... digo, Woof! Es que con tus caricias me derrito todito 🐾🥰',
    '¡Otro mimo más! Ya me volví adicto a que me rasques las orejitas 🐺✨',
    'Tus diseños de uñas quedan de otro planeta... ¡tienes manos de artista pura! 💅🌻',
    'Bang Chan y yo siempre decimos que tienes una paciencia y un pulso admirable 💅💛',
    '¡Esas manitos tuyas hacen magia en cada set de uñas! Deberías hacerme uno a mí 🐾💅',
    'Tus outfits en tonos neutros son pura paz... tienes un estilo tan limpio, relajante y hermoso 🕊️🤍',
    'Me encanta tu vibra calmada; con solo verte transmites una tranquilidad increíble ☁️💛',
    'El blanco, beige y los tonos tierra fueron inventados especialmente para que tú los lucieras ✨🕊️',
    'Eres la definición total de aesthetic y buen gusto, bombón 💛',
    'Aunque seas la mayor, esa timidez dulce cuando te tratan bonito me da una ternura infinita 🥺💛',
    'Ese sonrojo cuando te dicen cosas lindas es de las cosas más hermosas y dulces que existen 🙈💛',
    'Te pones chiquita cuando te consienten... ¡dan ganas de abrazarte y cuidarte siempre! 🐾💛',
    'No te dé pena sonreír hoy, ¡tienes una sonrisa que ilumina como un sol de primavera! 🌻✨',
    'Debajo de esa chica trabajadora e independiente hay un corazoncito súper tierno y dulce 💛',
    '¡21 de Septiembre! Flores amarillas eternas para consentir a mi bombón favorita 🌼💛',
    'Un girasol para otro girasol: iluminas cualquier lugar con solo estar ahí 🌻✨',
    'Estas flores amarillas nunca se van a marchitar, igual que todo el cariño que te tienen 🌼',
    'Dicen que las flores amarillas atraen felicidad pura... ¡y tú te mereces lo más radiante de la vida! 🌻💛',
    'Flores amarillas, Wolf Chan y Bang Chan... ¡te armamos el combo perfecto para ti hoy! 🌼🐺',
    'Bang Chan me dijo al oído: "Asegúrate de que Gabriela sepa lo talentosa y valiosa que es" 🐺💛',
    'You Make Stray Kids Stay... pero hoy sobre todo, tú haces sonreír a quien te preparó esto 💛',
    'Chan\'s Room siempre será tu lugar seguro cuando necesites descansar, Stay 🤗✨',
    'Christopher Bang te manda un: "G\'day mate! Keep shining, you\'re doing amazing!" 🐺🐾',
    'Si Bang Chan te conociera en persona, diría de inmediato: "She\'s so sweet and lovely!" 💛',
    'Stray Kids everywhere all around the world... ¡y la Stay más preciosa está aquí leyendo esto! 🌟',
    '¿Tuviste un día largo o pesado? Ven, quédate aquí y déjate mimar un ratito 🐾🤗',
    'Recuerda descansar, tomar agüita y comer rico hoy, bombón... ¡te lo ordenan Wolf Chan y Chan! 💛',
    'Tienes una luz tan bonita que hace que cualquier día gris se sienta cálido 🌟',
    '¡Sigue acariciándome! Mis orejitas de lobito se mueven solas de tanta felicidad 🐾🥺',
    '¿Sabías que tus mimos tienen superpoderes para alegrar el corazón? 🌸✨',
    '¡Soy oficialmente el Wolf Chan más afortunado y consentido de todo el universo! 🐺👑',
    'Si pudiera darte una patita de agradecimiento, te la daría mil veces 🐾💛',
    '¡Woof woof! ¡Me caes demasiado bien! Eres un encanto de persona 🐾✨',
    'No importa qué pase, nunca olvides lo especial y única que eres para nosotros 🐺💛'
  ];

  const milestonePhrases = {
    10: '¡10 mimos! ¡Ya somos mejores amigos oficiales, bombón! 🐾💛✨',
    25: '¡25 mimos! Wolf Chan está bailando de la emoción por tus caricias 🐺💃✨',
    50: '¡50 mimos! ¡Wow! Te ganaste un pase VIP a los abrazos de Bang Chan de por vida 🤗👑💛',
    75: '¡75 mimos! Mis orejitas no dan más de tanta felicidad y amor 🥰🐾🌻',
    100: '¡100 mimos cumplidos! Oficialmente eres la reina indiscutible de mi corazón 🐺👑💛✨'
  };

  const moodIcons = ['🐺', '🐾', '🥰', '🌻', '💛', '✨', '🥺', '🌸', '👑', '🤗'];

  avatar.addEventListener('click', (e) => {
    mimosCount++;
    if (petCounter) petCounter.innerText = `🐾 ${mimosCount} mimos`;

    // Seleccionar frase especial por hito o aleatoria sin repetir la anterior
    if (dialogue) {
      if (milestonePhrases[mimosCount]) {
        dialogue.innerText = `"${milestonePhrases[mimosCount]}"`;
        if (window.confetti) {
          window.confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.4 },
            colors: ['#facc15', '#fb7185', '#ffffff']
          });
        }
      } else {
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * cutePhrases.length);
        } while (nextIdx === lastPhraseIdx && cutePhrases.length > 1);
        lastPhraseIdx = nextIdx;
        dialogue.innerText = `"${cutePhrases[nextIdx]}"`;
      }
    }

    if (moodIcon) {
      moodIcon.innerText = moodIcons[Math.floor(Math.random() * moodIcons.length)];
    }

    // Generar corazoncito flotante
    if (heartsContainer) {
      const heart = document.createElement('span');
      heart.className = 'blush-sparkle';
      heart.innerText = ['💛', '🐾', '✨', '🌸', '🥰', '🌻', '🤍', '🍬'][Math.floor(Math.random() * 8)];

      const rect = avatar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      heart.style.left = `${clickX}px`;
      heart.style.top = `${clickY}px`;

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) heart.remove();
      }, 1200);
    }

    playPetSound();

    if (window.confetti) {
      window.confetti({
        particleCount: 12,
        spread: 35,
        origin: { y: 0.4 },
        colors: ['#facc15', '#f472b6', '#ffffff']
      });
    }
  });
}

/* ==============================================================================
   8. MODAL 1: EL ABRAZO DE BANG CHAN (CHAN'S BIG HUG)
   ============================================================================== */
function initBangChanHug() {
  const modal = document.getElementById('bangChanHugModal');
  const heroBtn = document.getElementById('heroHugBtn');
  const quickBtn = document.getElementById('quickHugBtn');
  const closeBtn = document.getElementById('closeHugModalBtn');
  const acceptBtn = document.getElementById('acceptHugBtn');

  function openHug() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    playEnvelopePop();

    if (window.confetti) {
      window.confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#facc15', '#ffffff']
      });
    }
  }

  function closeHug() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (heroBtn) heroBtn.addEventListener('click', openHug);
  if (quickBtn) quickBtn.addEventListener('click', openHug);
  if (closeBtn) closeBtn.addEventListener('click', closeHug);
  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    closeHug();
    alert('🤗 ¡Abrazo recibido! Bang Chan te envía toda su fuerza y cariño para tu día.');
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeHug();
    });
  }
}

/* ==============================================================================
   9. MODAL 2: CELEBRACIÓN DE LAS 21 FLORES (RAMO DE GABRIELA)
   ============================================================================== */
function openBouquetModal() {
  const modal = document.getElementById('bouquetCelebrationModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  if (window.confetti) {
    window.confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#facc15', '#fde047', '#f59e0b', '#fb7185', '#ffffff']
    });
  }
}

function initBouquetModal() {
  const modal = document.getElementById('bouquetCelebrationModal');
  const closeBtn = document.getElementById('closeBouquetModalBtn');
  const acceptBtn = document.getElementById('acceptBouquetBtn');

  function closeBouquet() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeBouquet);
  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    closeBouquet();
    alert('💐 ¡Ramo guardado! Que estas 21 flores amarillas te recuerden siempre lo especial que eres 💛');
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBouquet();
    });
  }
}
