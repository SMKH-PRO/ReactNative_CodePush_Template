module.exports = {
  // assets: ['./assets/fonts'],
  ...(process?.env?.NO_FLIPPER
    ? { 'react-native-flipper': { platforms: { ios: null } } }
    : {}),
};
