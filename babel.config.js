module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'transform-inline-environment-variables',
      {
        include: ['REACT_ENV'],
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
      },
    ],
  ],
};
