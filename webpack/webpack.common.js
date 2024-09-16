// const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = {
//   entry: {
//     popup: path.join(__dirname, "..", "src", "popup.tsx"),
//     options: path.join(__dirname, "..", "src", "options.tsx"),
//     background: path.join(__dirname, "..", "src", "background.ts"),
//     content_script: path.join(__dirname, "..", "src", "content_script.tsx"),
//   },
//   output: {
//     path: path.join(__dirname, "..", "dist", "js"),
//     filename: "[name].js",
//   },
//   optimization: {
//     splitChunks: {
//       name: "vendor",
//       chunks(chunk) {
//         return chunk.name !== "background";
//       },
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/i,
//         use: [
//           "style-loader",
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [require("tailwindcss"), require("autoprefixer")],
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".ts", ".tsx", ".js"],
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [{ from: "public", to: "../" }],
//     }),
//   ],
// };

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: path.join(__dirname, "..", "src", "popup.tsx"), // Ensure this path points to your src directory
    options: path.join(__dirname, "..", "src", "options.tsx"),
    background: path.join(__dirname, "..", "src", "background.ts"),
    content_script: path.join(__dirname, "..", "src", "content_script.tsx"),
  },
  output: {
    path: path.join(__dirname, "..", "dist", "js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "../" }],
    }),
  ],
};
