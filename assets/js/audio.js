/**
 * audio.js - Birthday Audio Manager & Web Audio SFX Engine
 * Handles background birthday playlists and procedural sound effects
 */

const BIRTHDAY_PLAYLIST = [
  {
    id: 0,
    title: "Happy Birthday (Piano Version)",
    artist: "Acoustic Melody",
    src: "assets/audio/happy-birthday-piano.mp3"
  },
  {
    id: 1,
    title: "Happy Birthday (Acoustic Guitar)",
    artist: "Joyful Celebration",
    src: "assets/audio/happy-birthday-acoustic.mp3"
  }
];

let currentSongIndex = 0;
let isAudioPlaying = false;
let isMuted = false;
const bgAudio = new Audio();
bgAudio.preload = "auto";
bgAudio.loop = true;

// Web Audio API Context for Procedural SFX
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Initialize Audio System
 */
function initAudio() {
  loadSong(currentSongIndex);

  bgAudio.addEventListener("play", () => {
    isAudioPlaying = true;
    updateAudioUI();
  });

  bgAudio.addEventListener("pause", () => {
    isAudioPlaying = false;
    updateAudioUI();
  });

  bgAudio.addEventListener("timeupdate", () => {
    const progressEl = document.getElementById("track-progress-bar");
    if (progressEl && bgAudio.duration) {
      const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
      progressEl.style.width = `${pct}%`;
    }
  });

  bgAudio.addEventListener("ended", () => {
    nextSong();
  });
}

function loadSong(index) {
  if (index < 0 || index >= BIRTHDAY_PLAYLIST.length) index = 0;
  currentSongIndex = index;
  const song = BIRTHDAY_PLAYLIST[index];
  bgAudio.src = song.src;

  const titleEl = document.getElementById("dock-track-title");
  if (titleEl) {
    titleEl.textContent = `${song.title} - ${song.artist}`;
  }
}

function playSong(index, forcePlay = true) {
  if (index !== undefined && index !== currentSongIndex) {
    loadSong(index);
  }
  getAudioContext();
  if (forcePlay) {
    bgAudio.play().catch(() => {
      // Autoplay blocked until user interaction
    });
  }
}

function toggleAudio() {
  getAudioContext();
  if (bgAudio.paused) {
    bgAudio.play().catch(() => {});
  } else {
    bgAudio.pause();
  }
}

function nextSong() {
  const nextIdx = (currentSongIndex + 1) % BIRTHDAY_PLAYLIST.length;
  playSong(nextIdx, true);
}

function prevSong() {
  const prevIdx = (currentSongIndex - 1 + BIRTHDAY_PLAYLIST.length) % BIRTHDAY_PLAYLIST.length;
  playSong(prevIdx, true);
}

function toggleMute() {
  isMuted = !isMuted;
  bgAudio.muted = isMuted;
  const btn = document.getElementById("btn-mute-toggle");
  if (btn) {
    btn.innerHTML = isMuted 
      ? '<i class="fa-solid fa-volume-xmark"></i>' 
      : '<i class="fa-solid fa-volume-high"></i>';
    btn.classList.toggle("active", isMuted);
  }
}

function updateAudioUI() {
  const playBtn = document.getElementById("btn-play-pause");
  const vinylEl = document.getElementById("dock-vinyl");
  if (playBtn) {
    playBtn.innerHTML = isAudioPlaying 
      ? '<i class="fa-solid fa-pause"></i>' 
      : '<i class="fa-solid fa-play"></i>';
  }
  if (vinylEl) {
    if (isAudioPlaying) {
      vinylEl.classList.add("playing");
    } else {
      vinylEl.classList.remove("playing");
    }
  }
}

function seekAudio(event) {
  const container = document.getElementById("track-progress-container");
  if (!container || !bgAudio.duration) return;
  const rect = container.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  bgAudio.currentTime = (clickX / width) * bgAudio.duration;
}

/* --------------------------------------------------------------------------
   Procedural Web Audio SFX (Zero Latency, No external downloads needed)
   -------------------------------------------------------------------------- */

/**
 * Sound of breath blowing out candles (Whoosh)
 */
function playBlowCandleSFX() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.45;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // White noise with exponential decay
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(600, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);
  filter.Q.setValueAtTime(3.0, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}

/**
 * Sound of lighting a candle (Spark / Match strike)
 */
function playLightCandleSFX() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(450, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

/**
 * Sound of party popper / confetti blast
 */
function playPartyPopperSFX() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Pop thump
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(280, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.7, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);

  // Sparkle chime chord (C - E - G - B - C)
  const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
  notes.forEach((freq, idx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, ctx.currentTime + 0.05 + idx * 0.04);

    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.setValueAtTime(0.22, ctx.currentTime + 0.05 + idx * 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8 + idx * 0.06);

    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime + 0.05 + idx * 0.04);
    o.stop(ctx.currentTime + 1.2);
  });
}

/**
 * Soft UI click tap
 */
function playTapSFX() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}
