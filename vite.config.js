import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(dirname, 'index.html'),
        start_j: resolve(dirname, 'strart_j.html'),
        hokkaido: resolve(dirname, 'Hokkaido.html'),
        kanto: resolve(dirname, 'Kanto.html'),
        kinki: resolve(dirname, 'kinki.html'),
        map: resolve(dirname, 'map.html'),
        okinawa: resolve(dirname, 'okinawa.html'),
        sikoku: resolve(dirname, 'sikoku.html'),
        tyuubu: resolve(__dirname, 'tyuubu.html'),
      },
    },
  },
});