module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@env': './env.js',
          },
        },
      ],
      'react-native-dotenv',
    ],
  };
  