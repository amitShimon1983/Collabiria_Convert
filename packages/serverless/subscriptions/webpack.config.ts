/* eslint-disable @typescript-eslint/no-use-before-define */
import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { IgnorePlugin } from 'webpack';

const posixPath = (path: string) => path.replace(/\\/g, '/');
const resolve = (...args: string[]) => posixPath(path.resolve(...args));
const srcDir = resolve(__dirname);
const outDir = resolve(__dirname, 'dist');

module.exports = () => {
  const plugins: any[] = [
    new IgnorePlugin({ resourceRegExp: /^mongodb-client-encryption$/ }),
    new IgnorePlugin({ resourceRegExp: /^canvas$/ }),
    new IgnorePlugin({ resourceRegExp: /^bson-ext$/ }),
    new IgnorePlugin({ resourceRegExp: /^kerberos$/ }),
    new CleanWebpackPlugin(),
  ];
  return {
    mode: 'production',
    target: 'node',
    entry: {
      'subscription-receive': `${srcDir}/subscription-receive/index.ts`,
      'subscription-update': `${srcDir}/subscription-update/index.ts`,
      'subscription-create': `${srcDir}/subscription-create/index.ts`,
      'subscription-delete': `${srcDir}/subscription-delete/index.ts`,
      'upload-attachments': `${srcDir}/upload-attachments/index.ts`,
    },
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      mainFields: ['main'],
      alias: {
        '~': [srcDir],
      },
    },
    externals: ['aws-sdk'],
    output: {
      libraryTarget: 'commonjs',
      filename: '[name]/index.js',
      path: outDir,
    },
    plugins,
  };
};
