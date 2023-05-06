import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig({
  //gif


  plugins: [
    react({ plugins: [["@swc/plugin-styled-components", {}]] })
  ],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  //fix Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').
})
