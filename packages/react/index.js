const React = require('react')
const {renderToStaticNodeStream} = require('react-dom/server')

exports.test = /\.jsx?$/

exports.webpack = {
	module: {
		rules: [
			{
				test: exports.test,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: [
								[require.resolve('@babel/preset-env'), {
									targets: {
										node: 'current'
									}
								}],
								require.resolve('@babel/preset-react')
							]
						}
					},
				]
			}
		 ]
	},
	externals: {
		'react': {commonjs: require.resolve('react')},
	}
}

exports.render = Component => {
	const element = React.createElement(Component)
	return renderToStaticNodeStream(element)
}