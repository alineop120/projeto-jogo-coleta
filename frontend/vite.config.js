import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const srcPath = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@context': path.resolve(srcPath, 'context'),

      // API: só o diretório, o import dos arquivos específicos fica relativo a isso
      '@api': path.resolve(srcPath, 'api'),

      // Components - alias geral e específicos para facilitar imports
      '@components': path.resolve(srcPath, 'components'),
      '@components/GameMap': path.resolve(srcPath, 'components/GameMap'),
      '@components/Player': path.resolve(srcPath, 'components/Player'),
      '@components/NPCs': path.resolve(srcPath, 'components/NPCs'),
      '@components/Recursos': path.resolve(srcPath, 'components/Recursos'),
      '@components/ErrorBoundary': path.resolve(srcPath, 'components/ErrorBoundary'),

      // Outros aliases organizados
      '@hooks': path.resolve(srcPath, 'hooks'),
      '@utils': path.resolve(srcPath, 'utils'),
      '@assets': path.resolve(srcPath, 'assets'),
      '@styles': path.resolve(srcPath, 'styles'),
      '@constants': path.resolve(srcPath, 'constants'),
      '@types': path.resolve(srcPath, 'types'),
      '@config': path.resolve(srcPath, 'config'),
      '@models': path.resolve(srcPath, 'models'),

      // Services
      '@services': path.resolve(srcPath, 'services'),

      // Backend (fora do src)
      '@backend': path.resolve(__dirname, 'backend'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});