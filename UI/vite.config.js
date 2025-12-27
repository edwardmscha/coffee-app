import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 빌드 최적화 설정
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 프로덕션에서는 소스맵 비활성화 (선택사항)
  },
  // 환경 변수 접두사 (Vite는 VITE_ 접두사 필요)
  envPrefix: 'VITE_',
})
