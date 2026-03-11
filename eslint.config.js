// @ts-check
const nextConfig = require("eslint-config-next");

// eslint-config-next@16 exports a flat config array directly
module.exports = [
  ...nextConfig,
  {
    rules: {
      // Allow empty catch blocks (used for graceful error silencing in auth code)
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
