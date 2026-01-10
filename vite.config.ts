import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 8080,
    // Ensure preview server handles SPA routing (serves index.html for all routes)
    // This is important for testing production builds locally
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Note: For SPA routing in development, Vite automatically serves index.html for all routes
  // For production, use _redirects (Netlify) or vercel.json (Vercel) files
}));
