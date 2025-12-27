import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const getDirname = dirname(filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(getDirname, 'index.html'),
        start_j: resolve(getDirname, 'strart_j.html'),
        hokkaido: resolve(getDirname, 'Hokkaido.html'),
        kanto: resolve(getDirname, 'Kanto.html'),
        kinki: resolve(getDirname, 'kinki.html'),
        map: resolve(getDirname, 'map.html'),
        okinawa: resolve(getDirname, 'okinawa.html'),
        sikoku: resolve(getDirname, 'sikoku.html'),
        tyuubu: resolve(getDirname, 'tyuubu.html'),
      },
    },
  },
});
