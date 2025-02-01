import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-tsparticles"], // Add this line
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://techofes25.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
