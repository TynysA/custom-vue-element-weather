const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/widget.ts",
  output: {
    filename: "widget.js",
    path: path.resolve(__dirname, "dist"),
    library: { type: "umd" },
  },

  mode: "production",

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: false,
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-loader",
            options: { exportType: "string" }, //!!!!
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },

  plugins: [new VueLoaderPlugin()],
};
