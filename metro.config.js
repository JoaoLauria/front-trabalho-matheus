
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watchFolders = [__dirname];
config.resolver.nodeModulesPaths = [__dirname];
config.maxWorkers = 2; 
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;
