# Getting Started

## Install

```bash{2,5}
# yarn
yarn add vue-filter-ui

# npm
npm i --save vue-filter-ui
```

## Usage

::: tip Required Attributes

There are some required props. Read more about this in the next chapter "[Configuration](./2-Configuration.md)".

:::

```vue
<template>
  <VueFilterUi :filter="filter" :parser="parser" />
</template>

<script>
import VueFilterUi, {inputs, layouts, parser} from "vue-filter-ui";

export default {
	components: {
		VueFilterUi
	},
	data(){
		return {
			parser: parser.FeathersJS,
			filter: [
				{
					title: "Items per page",
					chipTemplate: "Items per page: %1",
					required: true,
					layout: layouts.Default,
					filter: [
						{
							attribute: "$limit",
							operator: "=",
							input: inputs.Radio,
							options: [
								{ value: 25, label: "25" },
								{ value: 50, label: "50" },
								{ value: 100, label: "100" },
							],
						},
					],
				},
			]
		}
	}
};
</script>
```
