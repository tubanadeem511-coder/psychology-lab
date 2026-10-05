import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Force the automatic JSX runtime so components don't need `import React`.
  // Without it, classic JSX throws "React is not defined" and the page stays blank.
  esbuild: { jsx: 'automatic' },
});
