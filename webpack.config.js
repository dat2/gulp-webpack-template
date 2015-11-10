module.exports = {
  context: __dirname + '/src',
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      // babeljs
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015&cacheDirectory=true' }
    ]
  },

  devtool: 'inline-source-map'
};
