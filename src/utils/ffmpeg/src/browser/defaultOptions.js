const resolveURL = require('resolve-url');
const { devDependencies } = require('../../package.json');

/*
 * Default options for browser environment
 */
module.exports = {
  // corePath: '../../ffmpeg-core/ffmpeg-core.js'
  corePath: 'https://nhl-static.assets.playground.sweet.io/ffmpeg-core/ffmpeg-core.js'
  //  (typeof process !== 'undefined' && process.env.FFMPEG_ENV === 'development')
  //   ? resolveURL('/node_modules/@ffmpeg/core/dist/ffmpeg-core.js')
  //   : `https://unpkg.com/@ffmpeg/core@${devDependencies['@ffmpeg/core'].substring(1)}/dist/ffmpeg-core.js`,
};
