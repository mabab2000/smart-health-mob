module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsSymbols: true,
    },
  };
};
