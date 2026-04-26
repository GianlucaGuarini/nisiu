import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
