const CracoLessPlugin = require("craco-less")
const rewireBabelLoader = require("craco-babel-loader")
const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc")
const path = require("path")
const interpolateHtml = require("craco-interpolate-html-plugin")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const CompressionPlugin = require("compression-webpack-plugin")
const {getThemeVariables} = require("antd/dist/theme")

const isEnvProduction = process.env.NODE_ENV === "production"
process.env.GENERATE_SOURCEMAP = !isEnvProduction

module.exports = {
    webpack: {
        configure: (webpackConfig, {paths}) => {
            webpackConfig.optimization.splitChunks = {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 105000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // получает имя, то есть node_modules/packageName/not/this/part.js
                            // или node_modules/packageName
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1]

                            // имена npm-пакетов можно, не опасаясь проблем, использовать
                            // в URL, но некоторые серверы не любят символы наподобие @
                            return `npm.${packageName.replace("@", "")}`
                        }
                    }
                }
            }
            paths.appBuild = webpackConfig.output.path = path.resolve("build", "admin")
            // paths.appIndexJs = webpackConfig.entry.path = path.resolve(__dirname, 'src/pos.tsx')
            return webpackConfig
        },
        plugins: [...(isEnvProduction ? [
            new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css)$/
            }),
            new BundleAnalyzerPlugin()
        ] : [])]
    },
    plugins: [
        {
            plugin: BabelRcPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {
                            ...getThemeVariables(),
                            "max-width": "1200px",
                            "@box-shadow": "0 5px 20px rgba(146, 153, 184, 0.1)",
                            "@font-family":
                                "-apple-system, Montserrat, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                            "@primary-color": "#07ca63",
                            "@success-color": "#07ca63",
                            "@blue-color": "#6391fe",
                            // "@warning-color": "#ff6370",
                            "@error-color": "#f76160",
                            "@checkbox-color": "#6391fe",
                            "@radio-dot-color": "#6391fe",
                            "@border-width-base": "1px",
                            "@border-radius-base": "3px",
                            "@border-color-base": "#d7dce0",
                            "@black": "#1a222e",
                            "@text-color-secondary": "#c2c7cf",
                            "@layout-body-background": "#f8f9fb",
                            "@layout-header-background": "#1f2532",
                            "@skeleton-color": "#f8f9fb",
                            "@secondary-background": "#ededed"
                        }
                    }
                }
            }
        },
        {
            plugin: rewireBabelLoader,
            options: {
                excludes: [/(node_modules|bower_components)/] //things you want to exclude here
            }
        },
        {
            plugin: interpolateHtml,
            // Enter the variable to be interpolated in the html file
            options: {
                TITLE: "InsideBySana CRM: Панель администрирования",
                DESCRIPTION: "InsideBySana CRM: Панель администрирования",
                MANIFEST: "manifest.json",
                HEAD_TAGS: ""
            }
        }
    ]
}
