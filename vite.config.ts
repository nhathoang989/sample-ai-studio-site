import { defineConfig } from 'vite';

export default defineConfig({
  // Thiết lập base là './' để tất cả assets được trỏ tới theo đường dẫn tương đối
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});