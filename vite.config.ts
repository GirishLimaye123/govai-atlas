import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
  preview: {
    allowedHosts: ["ai4all.vectorcraft.net"]
  }
});
