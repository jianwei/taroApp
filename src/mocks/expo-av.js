// @author Claude Code (kimi-k2.5)

// Mock for expo-av
export const Audio = {
  Sound: {
    createAsync: () => Promise.resolve({ sound: {} }),
  },
  setAudioModeAsync: () => Promise.resolve(),
};

export const Video = () => null;
