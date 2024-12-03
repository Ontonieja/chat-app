import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 4000,
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  plugins: [react()],
});
