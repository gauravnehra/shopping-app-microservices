module.exports = {
  apps: [
    {
      script: "app.js",
      watch: true,
      name: "user-service",
      instances: "2",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "dev",
      },
    },
  ],
};
