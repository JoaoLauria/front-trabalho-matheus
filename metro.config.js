// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Increase the file watching limit
config.watchFolders = [__dirname];
config.resolver.nodeModulesPaths = [__dirname];
config.maxWorkers = 2; // Reduce the number of workers
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;
