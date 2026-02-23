module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsSymbols: true,
    },
  };
};
