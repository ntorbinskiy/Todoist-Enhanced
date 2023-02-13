import webpack from "webpack";
import config from "../webpack.config.js";

const { chromeExtensionBoilerplate, ...configWithoutBoilerplate } = config;

webpack(configWithoutBoilerplate, (err, stats) => {
  if (err) {
    throw err;
  }

  if (stats.hasErrors()) {
    throw stats.compilation.errors[0];
  }
});
