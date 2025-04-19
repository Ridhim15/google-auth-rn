module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						"@assets": "./assets",
						"@components": "./components",
						"@app": "./app",
						"@images": "./assets/images",
						"@icons": "./assets/icons",
					},
				},
			],
		],
	}
}

