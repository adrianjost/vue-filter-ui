# How to Configure a Filter

## Available Attributes

### labelAdd

### labelApply

### labelCancle

### componentSelect

### componentChips

### componentModal

### parser

### filter

```js
const filter = {
	// Root Options
	"title": String, // Modal title
	"chipTemplate": [String, Function], // Gets populated with the value, placeholder: %1(, %2)

	// Query data
	"attribute": String, // Property to filter
	"applyNegated": [Boolean, Function], // should the filter be applied negated?
	"operator": String, // ENUM [`>`, `>=`, `=`, `includes`, `range`]
	"value": [Boolean, Number, String, Date, Array, Object], // current filter value, Array values are or connected

	// UI options
	"options": Array< // values that value can be set to
		Object<
			value: [Boolean, Number, String, Date],
			label: String
		>
	>
	"design": [String, Component], // Defines the UI that is used, ENUM of predefined types
}
```
