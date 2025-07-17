import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    host: '0.0.0.0',  // Allows access from other devices
    port: 5173,       // Use your preferred port
  },
})