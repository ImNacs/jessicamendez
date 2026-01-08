/**
 * PM2 Configuration for jessicamendez.bio
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 reload jessicamendez
 *   pm2 logs jessicamendez
 */
module.exports = {
  apps: [
    {
      name: 'jessicamendez',
      script: './dist/server/entry.mjs',
      cwd: '/root/jessicamendez/web',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 4321,
      },
      env_file: '/root/jessicamendez/.env',
    },
  ],
};
