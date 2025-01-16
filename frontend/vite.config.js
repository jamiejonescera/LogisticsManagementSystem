import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Expose the server to external connections
    port: process.env.PORT || 3002,  // Use Render's provided port, fallback to 3002 locally
    proxy: {
      "/api": {
        target: "http://localhost:5000",  // Proxy API requests to the Flask backend
        secure: false,  // If you're using an insecure backend
      },
    },
  },
});
