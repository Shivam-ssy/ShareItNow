import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import buffer from 'buffer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // or 'global' depending on your environment
    'global.Buffer': buffer.Buffer
  },
  

})
