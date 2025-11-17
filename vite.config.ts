import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 自动检测 base 路径
// 1. 优先使用环境变量 VITE_BASE_PATH
// 2. 如果没有，使用相对路径（适合本地开发和自定义域名）
// 3. GitHub Actions 会自动设置 VITE_BASE_PATH
function getBasePath(): string {
  // 如果设置了环境变量，使用环境变量
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }
  
  // 本地开发或自定义域名使用相对路径
  return './'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173
  }
})

