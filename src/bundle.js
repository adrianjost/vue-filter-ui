import VueFilterUi from "./components/Filter";
const Inputs = require.context(
	"./components/inputs",
	false,
	/[A-Z]\w+\.(vue)$/
);
const Layouts = require.context(
	"./components/layouts",
	false,
	/[a-z]\w+\.(vue)$/
);
const Parser = require.context("./parser", false, /\w+\.(js)$/);

export const upperFirst = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

const requireComponents = (context) => {
	const components = {};
	context.keys().forEach((fileName) => {
		// Get component config
		const componentConfig = context(fileName);

		// Get PascalCase name of component
		const componentName = upperFirst(
			// Gets the file name regardless of folder depth
			fileName
				.split("/")
				.pop()
				.replace(/\.\w+$/, "")
		);
		components[componentName] = componentConfig.default || componentConfig;
	});
	return components;
};

export const inputs = requireComponents(Inputs);
export const layouts = requireComponents(Layouts);
export const parser = requireComponents(Parser);

export default VueFilterUi;
