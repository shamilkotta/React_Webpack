const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },

    resolve: {
        extensions: ["js", "jsx", "ts", "tsx"]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "public/")
        },
        devMiddleware: {
            publicPath: "http://localhost:3000/dist/"
        },
        port: 3000,
        hot: "only"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: "asset/resource",
                generator:{
                    filename: "assets/[hash][ext][query]"
                }
            },
            {
                test: /\.svg$/,
                type: "asset/inline",
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            hash: true,
            template: "./public/index.html",
        }),

        new MiniCssExtractPlugin({
            filename: "min.css"
        })
    ]
}