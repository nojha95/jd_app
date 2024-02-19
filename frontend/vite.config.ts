import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    sourcemap: true,
    target: "esnext",
  },
  server: {
    proxy: {
      "/match": "http://localhost:5000",
      "/logout": "http://localhost:5000",
      "/search": "http://localhost:5000",
    },
  },
});
