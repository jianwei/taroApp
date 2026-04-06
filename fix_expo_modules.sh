#!/bin/bash
# Fix expo modules - @author Claude Code (kimi-k2.5)

TARO_RN_DIR="/Users/chenjianwei2/github/taroApp/node_modules/@tarojs/taro-rn/dist"

# Fix media.js - remove Camera import
sed -i '' 's/import { Camera } from '\''expo-camera'\'';//g' "$TARO_RN_DIR/lib/media.js"
sed -i '' 's/yield Camera.requestCameraPermissionsAsync()/yield { granted: false }/g' "$TARO_RN_DIR/lib/media.js"

# Fix permission.js - remove Camera import  
sed -i '' 's/import { Camera } from '\''expo-camera'\'';//g' "$TARO_RN_DIR/lib/permission.js"
sed -i '' 's/Camera.requestCameraPermissionsAsync()/Promise.resolve({ granted: false })/g' "$TARO_RN_DIR/lib/permission.js"
sed -i '' 's/Camera.getCameraPermissionsAsync()/Promise.resolve({ granted: false })/g' "$TARO_RN_DIR/lib/permission.js"

# Fix createCameraContext/index.js - mock Camera
sed -i '' 's/import { Camera } from '\''expo-camera'\'';/*/g' "$TARO_RN_DIR/lib/createCameraContext/index.js"

echo "Done fixing expo modules"
