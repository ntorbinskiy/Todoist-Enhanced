import webpack from "webpack";
import path from "path";
import fileSystem from "fs";
import env from "./utils/env.js";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";

const alias = {};

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const secretsPath = path.join(__dirname, "secrets." + env.NODE_ENV + ".js");

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    content: path.join(__dirname, "src", "js", "contentScriptRoot.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
    assetModuleFilename: "icons/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        use: [{ loader: "file-loader?name=[name].[ext]" }],
      },
      {
        exclude: /node_modules/,
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    alias: alias,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    //  new CopyWebpackPlugin(
    //   {
    //     patterns: [
    //       { from: 'src/xxx.ext', to: 'dist/xxx.ext' },
    //       { from: 'src/yyy.ext', to: 'dist/yyy.ext' }
    //     ]
    //   }
    // )
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          transform: function (content, path) {
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
    }),
  ],
};

if (env.NODE_ENV === "development") {
  options.devtool = "cheap-module-source-map";
}

export default options;
