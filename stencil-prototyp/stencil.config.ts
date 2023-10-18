import { Config } from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';

export const config: Config = {
  namespace: 'stencil-prototyp',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'fonts/nunito-sans-v15-latin-regular.woff2', dest: 'fonts/nunito-sans-v15-latin-regular.woff2' },
        { src: 'fonts/nunito-sans-v15-latin-600.woff2', dest: 'fonts/nunito-sans-v15-latin-600.woff2' },
        { src: 'fonts/nunito-sans-v15-latin-700.woff2', dest: 'fonts/nunito-sans-v15-latin-700.woff2' },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "new",
  },
  rollupPlugins: {
    before: [
      replace({
        include: "node_modules/stream/index.js",
        delimiters: ['', ''],
        values: {
          "var Emitter = require('emitter');": "var Emitter = require('emitter-component');"
        }
      }),
    ],
    after: [
      nodePolyfills(),
    ]
  },
};
