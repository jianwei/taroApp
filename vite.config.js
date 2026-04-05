// @author Claude Code (claude-opus-4-6)
// Vite 配置 - 用于禁用 Sass 弃用警告

import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin']
      }
    }
  }
})
