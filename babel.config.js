module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "inline-dotenv",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}