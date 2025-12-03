import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        const redirectsSource = "public/_redirects.txt";
        const redirectsDest = "dist/_redirects";

        if (fs.existsSync(redirectsSource)) {
          fs.copyFileSync(redirectsSource, redirectsDest);
          console.log("✔ _redirects file copied to dist");
        } else {
          console.warn("⚠ _redirects.txt not found in public folder");
        }
      },
    },
  ],
})
