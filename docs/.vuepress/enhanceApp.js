import { inputs, layouts } from "../../src/export";

const prefixObj = (prefix, obj) => {
	const newObj = {};
	Object.entries(obj).forEach(([key, value]) => {
		newObj[prefix + key] = value;
	});
	return newObj;
};

const components = {
	...prefixObj("Input", inputs),
	...prefixObj("Layout", layouts),
};

import Demo from "../../src/components/Demo.vue";

export default ({
	Vue, // the version of Vue being used in the VuePress app
	options, // the options for the root Vue instance
	router, // the router instance for the app
	siteData, // site metadata
}) => {
	Object.entries(components).forEach(([name, config]) => {
		Vue.component(name, config);
	});
	Vue.component("DemoFilter", Demo);
};
