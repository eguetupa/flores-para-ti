/* ==============================================================================
   LÓGICA INTERACTIVA — FLORES AMARILLAS & STRAY KIDS (BANG CHAN / WOLF CHAN)
   100% Vanilla JS + Canvas 60fps + Web Audio API Sintetizado + 3D Tilt Photocard
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  initPetalCanvas();
  initGarden();
  initPhotocard3D();
  initMusicPlayer();
  initSecretEnvelope();
  initAudioSynthesizer();
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
  const petalCount = window.innerWidth < 768 ? 24 : 45;
  const sparkleCount = window.innerWidth < 768 ? 20 : 35;

  const petalColors = [
    'rgba(250, 204, 21, 0.85)',  // Amarillo vivo
    'rgba(253, 224, 71, 0.80)',  // Amarillo pastel
    'rgba(254, 240, 138, 0.75)', // Amarillo suave
    'rgba(251, 191, 36, 0.85)',  // Ámbar dorado
    'rgba(252, 231, 243, 0.70)'  // Rosa suave coquette
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayOffset = Math.random() * Math.PI * 2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.4 + 0.5;
    }
    update() {
      this.y += this.speedY;
      this.swayOffset += this.swaySpeed;
      this.x += Math.sin(this.swayOffset) * 1.2 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > height + 25 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Dibujar forma de pétalo orgánico
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
      this.size = Math.random() * 2.5 + 1;
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
   2. SINTETIZADOR WEB AUDIO API (CHIMES & MELODÍA LO-FI SKZ)
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

    // Notas de campana dulce arpegiada
    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomFreq, now);
    osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.5, now + 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {
    // Silently continue if audio blocked by browser policy
  }
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
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {}
}

/* ==============================================================================
   3. JARDÍN INTERACTIVO DE FLORES AMARILLAS
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
     <circle cx="47" cy="47" r="2.5" fill="#fef08a" opacity="0.6"/>
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
     <circle cx="48" cy="48" r="3" fill="#fff" opacity="0.8"/>
   </svg>`,

  // Tulipán amarillo suave
  `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
     <path d="M50 60 L50 98" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/>
     <path d="M50 78 Q30 70 38 90" fill="#22c55e"/>
     <path d="M50 72 Q70 65 62 85" fill="#22c55e"/>
     <g fill="#fde047" stroke="#eab308" stroke-width="1.5">
       <path d="M30 45 C30 65 70 65 70 45 C70 30 60 22 50 40 C40 22 30 30 30 45 Z" fill="#facc15"/>
       <path d="M40 38 C40 60 60 60 60 38 C60 25 50 18 50 35 C50 18 40 25 40 38 Z" fill="#fef08a" opacity="0.9"/>
     </g>
   </svg>`
];

let flowerCount = 0;
const milestones = [
  { count: 1, title: '🌱 La primera flor', desc: 'Para mi bombón: para empezar a llenar tu día de sonrisas.' },
  { count: 5, title: '✨ Un toque de calma', desc: 'Un ramito para alguien que transmite tanta paz como tú.' },
  { count: 10, title: '🐺 Mimos de Wolf Chan', desc: 'Wolf Chan dice: "Hoy te toca relajarte, sonreír y dejarte consentir."' },
  { count: 21, title: '🌟 ¡21 Flores para ti!', desc: '21 flores amarillas para la chica más linda. ¡Misión cumplida! 💛' }
];

function initGarden() {
  const gardenArea = document.getElementById('gardenArea');
  const waterBtn = document.getElementById('waterGardenBtn');
  const countEl = document.getElementById('flowerCounter');
  const progressBar = document.getElementById('gardenProgressBar');
  const milestoneToast = document.getElementById('milestoneToast');
  const milestoneTitle = document.getElementById('milestoneTitle');
  const milestoneDesc = document.getElementById('milestoneDesc');
  const closeToastBtn = document.getElementById('closeToastBtn');

  function plantFlower(x = null, y = null) {
    if (!gardenArea) return;
    flowerCount++;
    if (countEl) countEl.innerText = flowerCount;

    // Actualizar barra de progreso (meta 21 flores)
    const progressPercent = Math.min(100, (flowerCount / 21) * 100);
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    // Crear elemento flor
    const flowerWrapper = document.createElement('div');
    flowerWrapper.className = 'flower-bloom absolute select-none pointer-events-none cursor-pointer';

    const size = Math.floor(Math.random() * 26) + 48; // 48px - 74px
    flowerWrapper.style.width = `${size}px`;
    flowerWrapper.style.height = `${size}px`;

    const rect = gardenArea.getBoundingClientRect();
    const posX = x !== null ? x - rect.left - size / 2 : Math.random() * (rect.width - size);
    const posY = y !== null ? y - rect.top - size / 2 : Math.random() * (rect.height - size);

    // Delimitar dentro del área
    const clampX = Math.max(10, Math.min(rect.width - size - 10, posX));
    const clampY = Math.max(10, Math.min(rect.height - size - 10, posY));

    flowerWrapper.style.left = `${clampX}px`;
    flowerWrapper.style.top = `${clampY}px`;

    const randomSVG = flowerSVGs[Math.floor(Math.random() * flowerSVGs.length)];
    flowerWrapper.innerHTML = randomSVG;

    gardenArea.appendChild(flowerWrapper);

    // Sonido y Confetti
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
      milestoneToast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
      milestoneToast.classList.add('translate-y-0', 'opacity-100');

      if (window.confetti) {
        window.confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#facc15', '#fde047', '#f472b6', '#fff']
        });
      }

      setTimeout(() => {
        if (milestoneToast) {
          milestoneToast.classList.add('translate-y-10', 'opacity-0');
          setTimeout(() => milestoneToast.classList.add('hidden'), 300);
        }
      }, 7000);
    }
  }

  if (closeToastBtn && milestoneToast) {
    closeToastBtn.addEventListener('click', () => {
      milestoneToast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => milestoneToast.classList.add('hidden'), 300);
    });
  }

  if (waterBtn) {
    waterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      plantFlower();
    });
  }

  if (gardenArea) {
    gardenArea.addEventListener('click', (e) => {
      plantFlower(e.clientX, e.clientY);
    });
  }

  // Sembrar 4 flores iniciales para que el jardín no se vea vacío
  setTimeout(() => {
    plantFlower();
    plantFlower();
    plantFlower();
  }, 400);
}

function triggerMiniConfetti(x, y) {
  if (!window.confetti) return;
  const originX = x / window.innerWidth;
  const originY = y / window.innerHeight;
  window.confetti({
    particleCount: 18,
    spread: 50,
    startVelocity: 18,
    ticks: 60,
    origin: { x: originX, y: originY },
    colors: ['#facc15', '#fde047', '#fb7185', '#ffffff']
  });
}

/* ==============================================================================
   4. PHOTOCARD 3D DE COLECCIÓN (BANG CHAN & WOLF CHAN)
   Efecto Parallax 3D + Reflejo Holográfico tornasolado + Volteo 360°
   ============================================================================== */
function initPhotocard3D() {
  const cardContainer = document.getElementById('photocardContainer');
  const cardInner = document.getElementById('photocardInner');
  const holoOverlay = document.getElementById('holoOverlay');
  const flipBtn = document.getElementById('flipCardBtn');
  const flipBackBtn = document.getElementById('flipBackBtn');

  if (!cardContainer || !cardInner) return;

  let isFlipped = false;

  function toggleFlip() {
    isFlipped = !isFlipped;
    if (isFlipped) {
      cardInner.classList.add('flipped');
    } else {
      cardInner.classList.remove('flipped');
    }
    playEnvelopePop();
  }

  if (flipBtn) flipBtn.addEventListener('click', toggleFlip);
  if (flipBackBtn) flipBackBtn.addEventListener('click', toggleFlip);

  // Efecto Parallax Tilt 3D
  cardContainer.addEventListener('mousemove', (e) => {
    const rect = cardContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    const flipAngle = isFlipped ? 180 : 0;
    cardInner.style.transform = `rotateY(${flipAngle + rotateY}deg) rotateX(${rotateX}deg) scale3d(1.03, 1.03, 1.03)`;

    // Brillo holográfico interactivo
    if (holoOverlay) {
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
      holoOverlay.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,215,0,0.3) 25%, rgba(255,105,180,0.25) 50%, rgba(56,189,248,0.25) 75%, rgba(255,255,255,0) 100%)`;
      holoOverlay.style.opacity = '0.85';
    }
  });

  cardContainer.addEventListener('mouseleave', () => {
    const flipAngle = isFlipped ? 180 : 0;
    cardInner.style.transform = `rotateY(${flipAngle}deg) rotateX(0deg) scale3d(1, 1, 1)`;
    if (holoOverlay) holoOverlay.style.opacity = '0.5';
  });

  // Soporte táctil móvil con toque suave
  cardContainer.addEventListener('click', (e) => {
    // Si hace click directo en la tarjeta (sin ser botón de acción), también rota
    if (!e.target.closest('button')) {
      toggleFlip();
    }
  });
}

/* ==============================================================================
   5. REPRODUCTOR DE MÚSICA CON AUDIO REAL (3 CANCIONES SKZ) & SINTETIZADOR
   ============================================================================== */
function initMusicPlayer() {
  const audioEl = document.getElementById('skzAudio');
  const playBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
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
  const heartBtn = document.getElementById('favoriteHeartBtn');

  let isPlaying = false;
  let currentTrackIdx = 0;
  let synthInterval = null;

  const playlist = [
    {
      title: 'Youtiful',
      artist: 'Stray Kids (스트레이 키즈)',
      src: 'assets/youtiful.mp3',
      fallbackSrc: 'assets/Stray Kids Youtiful Video - Stray Kids.mp3',
      badge: 'Canción Oficial • Stray Kids',
      quote: '"You are beautiful just the way you are... never forget it 🌸"'
    },
    {
      title: 'Connected',
      artist: 'Bang Chan (방찬 - Stray Kids)',
      src: 'assets/connected.mp3',
      fallbackSrc: 'assets/Connected Stray Kids.mp3',
      badge: 'Bang Chan Solo • SKZ-RECORD',
      quote: '"We’re always connected, no matter where you are 🐺💛"'
    },
    {
      title: 'Hug Me (안아줄게요)',
      artist: 'I.N & Bang Chan (Stray Kids)',
      src: 'assets/hugme.mp3',
      fallbackSrc: 'assets/Hug Me (I.N) - Stray Kids.mp3',
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

  // Configuración del elemento de audio HTML5
  if (audioEl) {
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
      // Pasar a la siguiente canción automáticamente
      switchTrack(1);
    });

    audioEl.addEventListener('error', () => {
      const track = playlist[currentTrackIdx];
      if (track.fallbackSrc && !audioEl.src.includes(encodeURI(track.fallbackSrc))) {
        audioEl.src = track.fallbackSrc;
        audioEl.load();
        if (isPlaying) {
          audioEl.play().catch(() => fallbackToSynth());
        }
      } else {
        fallbackToSynth();
      }
    });
  }

  // Adelantar o retroceder haciendo clic o toque en la barra de progreso
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

  // Acordes Lo-fi con Web Audio API en caso de fallback (Cmaj9, Am9, Fmaj7, Gsus4)
  const chordProgressions = [
    [261.63, 329.63, 392.0, 493.88, 587.33], // C, E, G, B, D
    [220.0, 261.63, 329.63, 392.0, 493.88],  // A, C, E, G, B
    [174.61, 261.63, 329.63, 349.23, 440.0], // F, C, E, F, A
    [196.0, 261.63, 293.66, 392.0, 440.0]   // G, C, D, G, A
  ];

  let chordStep = 0;

  function playSynthChord() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const chord = chordProgressions[chordStep % chordProgressions.length];
      chordStep++;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const noteDelay = idx * 0.08;
        const startTime = ctx.currentTime + noteDelay;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.045, startTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 2.4);
      });
    } catch (e) {}
  }

  function startPlayback() {
    isPlaying = true;
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');
    if (equalizer) equalizer.classList.remove('paused');

    if (audioEl) {
      if (synthInterval) clearInterval(synthInterval);
      audioEl.muted = isMuted;
      audioEl.play().catch(() => {
        fallbackToSynth();
      });
    } else {
      fallbackToSynth();
    }
  }

  function fallbackToSynth() {
    if (audioEl) audioEl.pause();
    playSynthChord();
    if (synthInterval) clearInterval(synthInterval);
    synthInterval = setInterval(() => {
      playSynthChord();
    }, 2400);
  }

  function stopPlayback() {
    isPlaying = false;
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (equalizer) equalizer.classList.add('paused');

    if (audioEl) audioEl.pause();
    if (synthInterval) clearInterval(synthInterval);
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlayback();
    } else {
      getAudioContext();
      startPlayback();
    }
  }

  function switchTrack(direction) {
    const wasPlaying = isPlaying;
    stopPlayback();

    currentTrackIdx = (currentTrackIdx + direction + playlist.length) % playlist.length;
    const track = playlist[currentTrackIdx];

    if (trackTitle) trackTitle.innerText = track.title;
    if (trackArtist) trackArtist.innerText = track.artist;
    if (trackBadge) trackBadge.innerText = track.badge;
    if (trackQuote) trackQuote.innerText = track.quote;

    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.innerText = '0:00';
    if (totalTimeEl) totalTimeEl.innerText = '--:--';

    if (audioEl) {
      audioEl.src = track.src;
      audioEl.load();
    }

    if (wasPlaying) {
      startPlayback();
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => switchTrack(1));
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => switchTrack(-1));

  if (heartBtn) {
    let liked = false;
    heartBtn.addEventListener('click', () => {
      liked = !liked;
      heartBtn.classList.toggle('text-rose-500', liked);
      heartBtn.classList.toggle('text-gray-400', !liked);
      if (liked && window.confetti) {
        window.confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#f43f5e', '#fb7185', '#facc15']
        });
      }
    });
  }
}

/* ==============================================================================
   6. BUZÓN DE MENSAJE SECRETO (SOBRE CON SELLO DE CERA)
   ============================================================================== */
function initSecretEnvelope() {
  const envelope = document.getElementById('secretEnvelope');
  const waxSeal = document.getElementById('waxSeal');
  const editLetterBtn = document.getElementById('editLetterBtn');
  const letterRecipient = document.getElementById('letterRecipient');
  const letterBody = document.getElementById('letterBody');

  // Cargar personalización guardada si existe (evitando valores genéricos anteriores)
  const savedRecipient = localStorage.getItem('skz_yellow_recipient');
  const savedBody = localStorage.getItem('skz_yellow_letter_body');
  if (savedRecipient && !savedRecipient.includes('Persona Muy Especial') && letterRecipient) {
    letterRecipient.innerText = savedRecipient;
  }
  if (savedBody && letterBody) letterBody.innerText = savedBody;

  let isOpen = false;

  function openEnvelope() {
    if (isOpen) return;
    isOpen = true;
    if (envelope) envelope.classList.add('open');
    playEnvelopePop();

    if (window.confetti) {
      window.confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#facc15', '#fde047', '#f472b6', '#ffffff', '#eab308']
      });
    }
  }

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (envelope) {
    envelope.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        openEnvelope();
      }
    });
  }

  // Modal / Prompt para personalizar la carta con su nombre
  if (editLetterBtn) {
    editLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentName = letterRecipient ? letterRecipient.innerText.replace('Para: ', '') : '';
      const newName = prompt('¿Para quién es esta dedicatoria especial? (Escribe su nombre o apodo cariñoso):', currentName);
      if (newName && newName.trim() !== '') {
        const formatted = `Para: ${newName.trim()} 💛`;
        if (letterRecipient) letterRecipient.innerText = formatted;
        localStorage.setItem('skz_yellow_recipient', formatted);

        if (window.confetti) {
          window.confetti({
            particleCount: 30,
            spread: 60,
            colors: ['#facc15', '#fb7185']
          });
        }
      }
    });
  }
}

/* ==============================================================================
   7. CONTROL DE SONIDO GENERAL Y COPIAR ENLACE
   ============================================================================== */
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
