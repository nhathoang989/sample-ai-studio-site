
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Đảm bảo các file build ra sử dụng đường dẫn tương đối
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
