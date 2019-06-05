import camelCase from 'lodash/camelCase'

const Inputs = require.context('../../src/components/inputs',false,/[A-Z]\w+\.(vue|js)$/)
const Layouts = require.context(	'../../src/components/layouts',false,/[A-Z]\w+\.(vue|js)$/)

const upperFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const requireComponents = (prefix, context) => {
	const components = {};
	context.keys().forEach(fileName => {
		// Get component config
		const componentConfig = context(fileName)

		// Get PascalCase name of component
		const componentName = upperFirst(
			camelCase(
				// Gets the file name regardless of folder depth
				fileName
					.split('/')
					.pop()
					.replace(/\.\w+$/, '')
			)
		)
		components[prefix + componentName] =  componentConfig.default || componentConfig
	})
	return components;
}

const components = {
	...requireComponents("Input", Inputs),
	...requireComponents("Layout", Layouts),
}

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
	Object.entries(components).forEach(([name, config]) => {
		Vue.component(name, config)
	})
}