/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} values input values
 * @return {} feathers query object
 */
const generateQuery = (config, values) => {
  const query = {};
  debugger;
  config.forEach(group => {
    // edge case for sort
    if (
      group.filter.every(input =>
        ["$sort-attribute", "$sort-direction"].includes(input.attriute)
      )
    ) {
      query["$sort"] = {};
      const sortAttribute = group.filter.find(
        input => input.attribute === "$sort-attribute"
      );
      const sortDirection = group.filter.find(
        input => input.attribute === "$sort-direction"
      );
      query["$sort"][sortAttribute] = sortDirection;
      return;
    }
    // default handling
    group.filter.forEach(filter => {
      const applyNegated = filter.applyNegated(values[filter.id]);
      switch (filter.operator) {
        case "=":
          if (applyNegated) {
            query[filter.attribute] = { $ne: values[filter.id] };
          } else {
            query[filter.attribute] = values[filter.id];
          }
          break;
        case "<": {
          const key = applyNegated ? "$lt" : "$gte";
          query[filter.attribute] = {};
          query[filter.attribute][key] = values[filter.id];
          break;
        }
        case "<=": {
          const key = applyNegated ? "$lte" : "$gt";
          query[filter.attribute] = {};
          query[filter.attribute][key] = values[filter.id];
          break;
        }
        case "includes": {
          const key = applyNegated ? "$nin" : "$in";
          const value = values[filter.id];
          query[filter.attribute] = {};
          query[filter.attribute][key] = Array.isArray(value) ? value : [value];
          break;
        }
      }
    });
  });
  return query;
};

/**
 * @param  {[{}]} config filter configuration
 * @param  {{}} query feathers query
 * @return {{inputId: any}} returns values dictionary
 */
const parseQuery = (config, query) => {
  return;
};

export default {
  generateQuery,
  parseQuery
};
