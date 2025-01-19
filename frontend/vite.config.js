import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3002,
    proxy: {
      "/api": {
        target: "https://logisticsmanagementsystem-5c8t.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
