var webpack = require("webpack"),
  config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;

webpack(config, (err, stats) => {
  // [Stats Object](#stats-object)
  if (err) {
    throw err;
  }

  if (stats.hasErrors()) {
    throw stats.compilation.errors[0];
  }
  // Done processing
});
