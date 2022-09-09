const {when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES} = require("@craco/craco");
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    webpack: {
        alias: {},
        plugins: {
            add: [new WebpackObfuscator({
                rotateStringArray: true
            })],
            configure: (webpackConfig, {env, paths}) => {
                return webpackConfig;
            }
        }
    }
}
