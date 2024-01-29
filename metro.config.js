// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.server.rewriteRequestUrl = (url = "") => {
  if (url.startsWith("/api")) {
    console.warn("rewriteRequestUrl", url);
    return "http://60.16.1.123:18070" + url;
  }
  return url;
};

module.exports = config;
