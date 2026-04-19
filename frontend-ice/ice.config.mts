import { defineConfig } from '@ice/app';

// The project config, see https://v3.ice.work/docs/guide/basic/config
const minify = process.env.NODE_ENV === 'production' ? 'swc' : false;
const djangoTarget = process.env.DJANGO_DEV_SERVER || 'http://127.0.0.1:8000';
export default defineConfig(() => ({
  // Set your configs here.
  minify,
  outputDir: '../backend-django/frontend_dist',
  server: {
    onDemand: true,
    format: 'esm',
    proxy: {
      '/admin': {
        target: djangoTarget,
        changeOrigin: true,
      },
      '/login': {
        target: djangoTarget,
        changeOrigin: true,
      },
      '/logout': {
        target: djangoTarget,
        changeOrigin: true,
      },
      '/static': {
        target: djangoTarget,
        changeOrigin: true,
      },
    },
  },
}));
