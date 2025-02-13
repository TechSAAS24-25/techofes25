import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      external: ["react-tsparticles"], // Add this line
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
