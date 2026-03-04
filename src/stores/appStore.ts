import { create } from 'zustand';

interface AppState {
  booted: boolean;
  showAbout: boolean;
  scrollLocked: boolean;
  audioEnabled: boolean;
  currentSection: string;
  setBoot: (booted: boolean) => void;
  setShowAbout: (show: boolean) => void;
  setScrollLocked: (locked: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  booted: false,
  showAbout: false,
  scrollLocked: false,
  audioEnabled: true,
  currentSection: 'hero',
  setBoot: (booted) => set({ booted }),
  setShowAbout: (show) => set({ showAbout: show }),
  setScrollLocked: (locked) => set({ scrollLocked: locked }),
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setCurrentSection: (section) => set({ currentSection: section }),
}));
