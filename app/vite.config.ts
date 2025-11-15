import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@myorg/ui/button": resolve(__dirname, "../packages/ui/src/button"),
      "@myorg/ui/table": resolve(__dirname, "../packages/ui/src/table"),
      "@myorg/ui/input": resolve(__dirname, "../packages/ui/src/input"),
      "@myorg/ui/card": resolve(__dirname, "../packages/ui/src/card"),
      "@myorg/ui/chart": resolve(__dirname, "../packages/ui/src/chart"),
      "@myorg/ui": resolve(__dirname, "../packages/ui/src"),
      "@myorg/utils/date": resolve(__dirname, "../packages/utils/src/date"),
      "@myorg/utils/number": resolve(__dirname, "../packages/utils/src/number"),
      "@myorg/utils/string": resolve(__dirname, "../packages/utils/src/string"),
      "@myorg/utils/validation": resolve(
        __dirname,
        "../packages/utils/src/validation"
      ),
      "@myorg/utils": resolve(__dirname, "../packages/utils/src"),
    },
  },
  // Optional: explicitly watch the packages
  server: {
    watch: {
      ignored: ["!**/packages/**"],
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better analysis
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
});
