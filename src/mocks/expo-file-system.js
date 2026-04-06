// @author Claude Code (kimi-k2.5)

// Mock for expo-file-system
export const readAsStringAsync = () => Promise.resolve('');
export const writeAsStringAsync = () => Promise.resolve();
export const deleteAsync = () => Promise.resolve();
export const getInfoAsync = () => Promise.resolve({ exists: false });
export const makeDirectoryAsync = () => Promise.resolve();
export const copyAsync = () => Promise.resolve();
export const moveAsync = () => Promise.resolve();
