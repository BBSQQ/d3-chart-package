const path = require('path');

module.exports = {
  devtool: 'cheap-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: '$chart',
    libraryTarget: 'umd',
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-flow',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'example'),
    open: true,
    publicPath: '/lib/',
  },
  externals: {
    'd3': 'd3'
  }
};
