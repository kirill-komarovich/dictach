module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          containers: './src/containers',
          actions: './src/actions',
          paths: './src/paths',
          utils: './src/utils',
          src: './src',
        },
        extensions: ['.js', '.jsx', '.scss', '.json'],
      },
    ],
    'named-asset-import',
    [
      'react-intl',
      {
        'messagesDir': './src/translations/',
      }
    ],
  ],
};
