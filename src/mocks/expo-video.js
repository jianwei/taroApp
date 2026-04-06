// @author Claude Code (kimi-k2.5)

// Mock for expo-video module
export const VideoView = () => null;
export const VideoPlayer = () => null;
export const useVideoPlayer = () => ({
  play: () => {},
  pause: () => {},
  replace: () => {},
});
export default { VideoView, VideoPlayer, useVideoPlayer };
