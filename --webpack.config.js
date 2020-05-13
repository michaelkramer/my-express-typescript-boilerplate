const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  //target: "web",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
  },

  entry: {
    main: "./src/views/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "assets/js/[name].[contenthash:8].js",
    publicPath: "/",
  },
  // bail: true,
  // // Some libraries import Node modules but don't use them in the browser.
  // // Tell Webpack to provide empty mocks for them so importing them works.
  // node: {
  //   dgram: "empty",
  //   fs: "empty",
  //   net: "empty",
  //   tls: "empty",
  //   child_process: "empty",
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src/views/**")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     compilerOptions: {
      //       "sourceMap": !isProduction,
      //     }
      //   }
      // }
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
  ],
};

// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = (_env, argv) => {
//   const isProduction = argv.mode === "production";
//   const isDevelopment = !isProduction;

//   return {
//     devtool: isDevelopment && "cheap-module-source-map",
//     entry: {
//       main: "./src/views/index.tsx",
//       //html: "./src/public/index.html",
//     },
//     output: {
//       path: path.resolve(__dirname, "build"),
//       filename: "assets/js/[name].[contenthash:8].js",
//       publicPath: "/",
//     },
//     module: {
//       rules: [
//         // {
//         //     test: /\.html$/,
//         //     use: ["html-loader"]
//         //   },
//         // {
//         //   loader: "babel-loader",
//         //   test: /\.js$|jsx/,
//         //   exclude: /node_modules/,
//         // },
//         // {
//         //   test: /\.js$|jsx/,
//         //   exclude: /node_modules/,
//         //   use: {
//         //     loader: "babel-loader",
//         //     options: {
//         //       cacheDirectory: true,
//         //       //presets: ["react", "es2015"],
//         //       //envName: isProduction ? "production" : "development",
//         //     },
//         //   },
//         // },
//       ],
//     },
//     resolve: {
//       extensions: [".js", ".jsx"],
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: "./src/public/index.html",
//       }),
//       new webpack.ProvidePlugin({
//         React: "react",
//       }),
//     ],
//   };
// };
