import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import {VitePluginNode} from 'vite-plugin-node';

// noinspection JSUnusedGlobalSymbols (Used by ViteJS)
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: resolve(__dirname, './src/main.js'),
    }),
  ],
});
