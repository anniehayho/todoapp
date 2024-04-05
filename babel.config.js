// eslint-disable-next-line no-undef
module.exports = {
  // presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', 'tsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
        },
      }
    ],
    'react-native-reanimated/plugin'
  ],
  presets: ["module:metro-react-native-babel-preset"]
};
