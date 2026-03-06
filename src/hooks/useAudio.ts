import { Howl, Howler } from 'howler';
import { useAppStore } from '../stores/appStore';

const soundCache: Record<string, Howl> = {};

const SOUNDS: Record<string, string> = {
  hover: '/sounds/hover.wav',
  click: '/sounds/click.wav',
  crackle: '/sounds/crackle.wav',
  typing: '/sounds/typing.mp3',
  whoosh: '/sounds/whoosh.wav',
};

const VOLUMES: Record<string, number> = {
  hover: 0.25,
  click: 0.35,
  crackle: 0.3,
  typing: 0.2,
  whoosh: 0.35,
};

function getSound(name: string): Howl | null {
  if (!SOUNDS[name]) return null;
  if (!soundCache[name]) {
    soundCache[name] = new Howl({
      src: [SOUNDS[name]],
      volume: VOLUMES[name] ?? 0.3,
      preload: true,
      html5: false, // Use Web Audio API (no download prompt)
    });
  }
  return soundCache[name];
}

// Pre-load all sounds immediately
Object.keys(SOUNDS).forEach((name) => getSound(name));

export function playSound(name: string) {
  const { audioEnabled } = useAppStore.getState();
  if (!audioEnabled) return;
  try {
    const sound = getSound(name);
    sound?.play();
  } catch {
    // Silently fail
  }
}

let ambientMusic: Howl | null = null;

export function startAmbientMusic() {
  if (ambientMusic) return;
  ambientMusic = new Howl({
    src: ['/sounds/ambient.mp3'],
    volume: 0.1,
    loop: true,
    preload: true,
    html5: false, // Use Web Audio API (html5 mode triggers downloads)
  });
  ambientMusic.play();
}

export function stopAmbientMusic() {
  if (ambientMusic) {
    ambientMusic.stop();
    ambientMusic.unload();
    ambientMusic = null;
  }
}

export function toggleAudio() {
  const store = useAppStore.getState();
  const newState = !store.audioEnabled;
  store.setAudioEnabled(newState);
  
  // Mute/unmute globally via Howler
  Howler.mute(!newState);
  
  if (newState) {
    startAmbientMusic();
  } else {
    stopAmbientMusic();
  }
}

// Automatically mute audio when user switches tabs or minimizes the window
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    const { audioEnabled } = useAppStore.getState();
    if (document.hidden) {
      Howler.mute(true);
    } else {
      Howler.mute(!audioEnabled);
    }
  });
}
