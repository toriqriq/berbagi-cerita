const path = require("path"); // ✅ Tambahkan ini
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // import plugin
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html", // sesuaikan path ke file html utama kamu
      filename: "index.html", // nama file output di dist/
    }),

    new InjectManifest({
      swSrc: path.resolve(__dirname, "src/public/service-worker.js"),
      swDest: "service-worker.js",
    }),
  ],
});
