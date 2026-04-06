// @author Claude Code (kimi-k2.5)

// Mock for expo-modules-core
export const NativeModulesProxy = {};
export const requireNativeModule = (name) => {
  throw new Error(`Cannot find native module '${name}'`);
};
export const requireNativeViewManager = (viewName) => {
  // Return a mock React component
  return function MockNativeView(props) {
    return null;
  };
};
export const EventEmitter = class {};
export const Platform = {
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
};
export const UnavailabilityError = class extends Error {
  constructor(moduleName, featureName) {
    super(`'${featureName}' is not available in ${moduleName}`);
  }
};
export const uuid = () => Math.random().toString(36).substring(2, 15);
