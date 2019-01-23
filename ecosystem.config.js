module.exports = {
  apps : [
      {
        name: "Devball_Monitor",
        script: "./index.js",
        watch: true,
        env: {
          "PORT": "3003",
        }
      }
  ]
}