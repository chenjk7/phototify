module.exports = {
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        // include: __dirname + "/app/",
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["css-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  }
};
