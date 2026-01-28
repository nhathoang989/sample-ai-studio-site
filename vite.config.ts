import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables from the current directory.
  // The third argument '' allows loading variables without the VITE_ prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Ensure relative paths for assets to work correctly on GitHub Pages
    base: './',
    // Inject the API_KEY into the client-side code during the build process
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ''),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});