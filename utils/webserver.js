import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "../webpack.config.js";
import path from "path";
import env from "./env";

const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      "webpack-dev-server/client?http://localhost:" + env.PORT,
      "webpack/hot/dev-server",
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

const { chromeExtensionBoilerplate, ...configWithoutBoilerplate } = config;

const compiler = webpack(configWithoutBoilerplate);

const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, "../build"),
  sockPort: env.PORT,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  disableHostCheck: true,
});

server.listen(env.PORT);
