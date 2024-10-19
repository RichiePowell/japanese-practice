import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const baseUrl = process.env.VITE_BASE_URL || "http://localhost:3000";

  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            BASE_URL: baseUrl,
            GA_TRACKING_ID: process.env.VITE_GA_TRACKING_ID,
          },
        },
      }),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Japanese Practice",
          short_name: "Practice",
          description: "Practice Hiragana and Katakana characters",
          theme_color: "#c83232",
          icons: [
            {
              src: "icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  };
});
