import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt,woff2}"],
      },
      includeAssets: ["WebUtils.svg"],
      manifest: {
        name: "Extensible Web Utilities Toolbox",
        short_name: "WebUtils",
        description: "Modular collection of web utilities",
        theme_color: "#0ea5e9",
        background_color: "#0b1220",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/WebUtils.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
