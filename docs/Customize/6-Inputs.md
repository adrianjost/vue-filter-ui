# Custom Inputs

## Interface

A custom input must implement the following interface:

### Props

| Prop      | value           | description                                                                                 |
| --------- | --------------- | ------------------------------------------------------------------------------------------- |
| `v-model` |                 | Read the [vue docs](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) |
| `label`   | `String`        | the label of the input                                                                      |
| `options` | `Array<Object>` | Each Object contains the attributes `value` and `label`.                                    |

In addition, you can implement whatever props you want and pass them staticly with the config key `attributes` at input config level to your component

Example:
```js {9-12}
[
	{
		title: "...",
		chipTemplate: "%1",
		layout: layouts.Default,
		filter: [
			{
				input: BaseInput,
				attributes: {
					type: "number",
					placeholder: "placeholder text"
				},
			},
		],
	},
]
```

This will bind the attributes `type` and `placeholder` to rendered `BaseInput` component and these attributes will be accessible as props in the `BaseInput` component

## Examples

### Toggle

<<< ~../../src/components/inputs/Toggle.vue

### TriSwitch

<<< ~../../src/components/inputs/TriSwitch.vue
