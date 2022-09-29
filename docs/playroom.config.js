const babelConfig = require('../babel.config');
const webpack = require('webpack');

module.exports = {
  title: 'Spark Web',
  baseUrl: '/playroom/',
  exampleCode: `<Text>Hello world</Text>`,
  components: './playroom/components.ts',
  frameComponent: './playroom/frame.tsx',
  openBrowser: false,
  outputPath: './public/playroom/',
  port: 9000,
  typeScriptFiles: [
    '../packages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '!**/node_modules',
  ],
  widths: [320, 768, 1024],
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [new webpack.ProvidePlugin({ process: 'process/browser' })],
  }),
};
