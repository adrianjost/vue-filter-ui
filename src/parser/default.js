/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} values input values
 * @return {} generic query object
 */
export const generator = (config, values) => {
	const query = [];
	config.forEach((group) => {
		const filter = group.filter.find((input) => values[input.id] !== undefined);
		if (!filter) {
			return;
		}
		const newFilter = {
			attribute: filter.attribute,
			value: values[filter.id],
			operator: filter.operator || "=",
			applyNegated: filter.applyNegated() || false,
		};
		query.push(newFilter);
	});
	return query;
};

/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} query generic query
 * @return {{inputId: any}} returns values dictionary
 */
export const parser = (config, query) => {
	const values = {};
	query.forEach((filter) => {
		config.forEach((group) => {
			group.filter.forEach((input) => {
				if (input.attribute === filter.attribute) {
					const newValue = filter.value;
					if (newValue === undefined) {
						return;
					}
					values[input.id] = newValue;
				}
			});
		});
	});
	return values;
};

export default {
	generator,
	parser,
};
