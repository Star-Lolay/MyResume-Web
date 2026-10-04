import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径构建：部署到 GitHub Pages 仓库子路径（user.github.io/repo/）也能正常加载资源
  base: '/MyResume-Web/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // 纯静态输出：dist/ 整个目录即可直接部署
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
