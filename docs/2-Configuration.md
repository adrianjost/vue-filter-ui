# How to Configure a Filter

[[toc]]

## labelAdd

Used as the primary Action title to add a new Filter.

**default:** `add filter`

## labelApply

Label of the Apply Button of the Modal. Used in the [componentModal](#componentModal)-Component

**default:** `apply`

## labelCancle

Label of the Cancle Button of the Modal. Used in the [componentModal](#componentModal)-Component

**default:** `cancle`

## labelRemove

Label of the Remove Button of the Modal. Used in the [componentModal](#componentModal)-Component

**default:** `remove`

## componentSelect

Option to replace the component that renders the list of available filters that are not currently applied. Read more under [customization](./Customize/1-Select.md).

## componentChips

Option to replace the component that renders the list of currently active and applied filters. Read more under [customization](./Customize/2-Chips.md).

## componentModal

Wrapper-Component for the dialog where the user can enter there filter settings. You can exchange the default modal by specifing your new modal here. Your custom modal must implement the [Modal specifications](./Customize/3-Modal.md).

## parser

The parsers are used to generate the language specific query from the abstract config object. They are also used to initialy populate the ui with values from an existing query.
To use an existing parser, you can simply import it.

```html
<template>
  <FilterComponent :parser="parser" />
</template>

<script>
  import parser from "TODO";

   data(){
   	return {
   		parser,
   	}
   }
</script>
```

## filter

The Filter Attribute gets an Array of [filter-groups](#filter-groups).

### filter-groups

Each filter-group is an Object and must define the following attributes:

| attribute      | type                | required | description                                                                                                                                                                                                                                                                                                                                                                                                                                |
|----------------|---------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`        | `String`            | ✔        | Used as the title in the [componentModal](#componentModal).                                                                                                                                                                                                                                                                                                                                                                                |
| `chipTemplate` | `String`/`Function` | ✔        | Used as a template for the strings displayed in the [componentChips](#componentChips). If it is a string, it needs to define a placeholder for each input of the group (in order). The Placeholderformat is `%n` with n beeing the index of the input in the config. If defined as a function, the function gets the values of the inputs as an array of values v. The value for `input[i]` is in `v[i]`. The Method must return a String. |
| `filter`       | `Array`             | ✔        | List of Filter Inputs. Each Filter must be an Object with the format [described below](#filter-inputs).                                                                                                                                                                                                                                                                                                                                    |
| `layout`       | `Component`         | ❌        | You can import some predefined designs from `import { layouts } from "vue-filter.ui"`. The Component must implement the interface [described under customization](/Customize/4-Layout.md).                                                                                                                                                                                                                                                 |
| `required`     | `Boolean`           | ❌        | If `true`, the filter-group can not be removed from the applied filters list once it was applied. Usefull for static filters like _"item per page"_.                                                                                                                                                                                                                                                                                       |

```js
import MyCustomLayout from "./MyCustomLayout";
{
	title: "Year",
	chipTemplate: "from %1",
	layout: MyCustomLayout
	filter: [ /* ... */ ]
},
```

```js
{
	title: "Sort",
	chipTemplate: (attribute, order) => `Sort by ${attribute} ${order ? "↗" : "↘" }`,
	layout: "sort",
	required: true,
	filter: [ /* ... */ ]
},
```

### filter-inputs

| attribute      | type                 | required | description                                                                                                                                                                                                                                                                                             |
|----------------|----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `attribute`    | `String`             | ✔        | the database attribute that should get queried. There is an edge case for the sort filter. The Sort may be generated by two inputs. Those therefore must have the attribute names `$sort-attribute` and `$sort-order`.                                                                                  |
| `options`      | `Array`              | ❌        | Available Options for the input. If defined, each entry must be an object with the keys `label` and `value`. <br/>**Note:** some inputs may define default options, but you should always specify your own to be safe.                                                                                  |
| `applyNegated` | `Boolean`/`Function` | ❌        | • Defines, whether the user selected value should be negated in the generated query. Example: User: `true`, applyNegated: `true` results in the query for `not true`. <br/>• Defaults to false. <br />• When used as a function, those function gets the current input value and must return a Boolean. |
| `input`        | `Component`          | ✔        | Specifies the component which will be used for the input. You can import some predefined designs from `import { inputs } from "vue-filter.ui"`. Read more about custom inputs [here](/Customize/5-Input.md).                                                                                            |
| `operator`     | `String`             | (✔)      | • Defines the operator used in the generated query. <br/>• defaults to `=` <br/> • Must be one of the following options: `>`, `>=`, `=` or `includes`.<br/> • `<` and `<=` can be achived by negating the input with `applyNegated`.                                                                    |
| `label`        | `String`             | (✔)      | Some Inputs require a label. This is often the case for free text inputs without options. Read more in the [inputs documentation](/Components/Inputs.md)                                                                                                                                                |

```js
filter: [
  {
    attribute: "$year",
    applyNegated: true,
    operator: "=",
    design: "Radio",
    options: [
      { value: 2018, label: "2018" },
      { value: 2019, label: "2019" },
      { value: 2020, label: "2020" }
    ]
  }
  // ...
];
```
