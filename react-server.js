var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var publicPath = "js/";
publicPath = "http://localhost:4000/" + publicPath;

var loaders = ["babel"];

var config = {
  devtool: "eval",
  entry: path.join(__dirname, "/client/app"),
  output: {
      path: path.join(__dirname, "/public/js"),
      filename: "app.js",
      publicPath: publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: loaders,
        include: path.join(__dirname, "client"),
        exclude: /node_modules/
      }
    ]
  }
};

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, "public"),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(4000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:4000');
});
