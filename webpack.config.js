const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


const htmlWebPackPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});

module.exports = {
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
        test: /\.svg$/,
        loader: 'svg-inline-loader'
   		},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[name]_[local]_[hash:base64]",
							sourceMap: true,
							minimize: true
						}
					}
				]
			}
		]
	},
	devServer: {
    port: 3000,
    open: true,
    proxy: {
			"/": "http://localhost:8080"
    }
  },
	plugins: [htmlWebPackPlugin]
};