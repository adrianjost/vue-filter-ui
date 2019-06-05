# How to Configure a Filter

[[toc]]

## labelAdd

Used as the primary Action title to add a new Filter.

## labelApply

Label of the Apply Button of the Modal. Used in the [componentModal](#componentModal)-Component

## labelCancle

Label of the Cancle Button of the Modal. Used in the [componentModal](#componentModal)-Component

## componentSelect

Component that renders the list of available filters that are not currently applied. The Component must implement the following interface:

### Props

| Prop       | value           | description                                                                             |
| ---------- | --------------- | --------------------------------------------------------------------------------------- |
| `options`  | `Array<Object>` | List of config groups. Take a look on the [#filter](#filter) property for more details. |
| `labelAdd` | `String`        | Passthrough of the attribute [`labelAdd`](#labelAdd)                                    |

### Events

| Event        | value    | description                                                                                             |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `openFilter` | `String` | emits a `groupId` of the filtergroup that should be opened. The `groupId` is defined in `options[i].id` |

## componentChips

Component that renders the list of currently active and applied filters. The Component must implement the following interface:

### Props

| Prop    | value   | description                                                                                                       |
| ------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `chips` | `Array` | List of Objects that contain information about the currently active and applies filtergroups. More details below. |

#### `chips`

Each entry of the array is an object with the folowing attributes:

```js
// chips = Array<chip>
const chip = {
  id: String, // unique group id
  deletable: Boolean, // some filters shouldn't be deletable
  label: String // with values populated `chipTemplate`
};
```

### Events

| Event    | value  | description                                                                                                                               |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `open`   | String | emits a `groupId` of the filtergroup that should be opened. The `groupId` is defined in `chip[i].id`.                                     |
| `remove` | String | emits a `groupId` of the filtergroup that should be removed from the currently applied filters. The `groupId` is defined in `chip[i].id`. |

## componentModal

Wrapper-Component for the dialog where the user can enter there filter settings. You can exchange the default modal by specifing your new modal here. Your custom modal must implement the [Modal specifications](./Customize/1-Modal.md).

## parser

## filter

The Filter Attribute gets an Array of [filter-groups](#filter-groups).

### filter-groups

Each filter-group is an Object and must define the following attributes:

| attribute      | type                 | required | description                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`        | `String`             | ✔        | Used as the title in the [componentModal](#componentModal).                                                                                                                                                                                                                                                                                                                          |
| `chipTemplate` | `String`/`Function`  | ✔        | Used as a template for the strings displayed in the [componentChips](#componentChips). If it is a string, it needs to define a placeholder for each input of the group (in order). The Placeholderformat is `%n` with n beeing the index of the input in the config. If defined as a function, the function gets the values of `input[i]` as parameter `i` and must return a String. |
| `filter`       | `Array`              | ✔        | List of Filter Inputs. Each Filter must be an Object with the format [described below](#filter-inputs).                                                                                                                                                                                                                                                                              |
| `layout`       | `String`/`Component` | ❌       | can be either the name of a predefined template (String) or a custom component. The Component must implement the interface [described under customization](/Customize/2-Layout.md).                                                                                                                                                                                                  |
| `required`     | `Boolean`            | ❌       | If `true`, the filter-group can not be removed from the applied filters list once it was applied. Usefull for static filters like _"item per page"_.                                                                                                                                                                                                                                 |

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
| -------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attribute`    | `String`             | ✔        | the database attribute that should get queried. There is an edge case for the sort filter. The Sort may be generated by two inputs. Those therefore must have the attribute names `$sort-attribute` and `$sort-order`.                                                                                  |
| `options`      | `Array`              | ❌       | Available Options for the input. If defined, each entry must be an object with the keys `label` and `value`. <br/>**Note:** some inputs may define default options, but you should always specify your own to be safe.                                                                                  |
| `applyNegated` | `Boolean`/`Function` | ❌       | • Defines, whether the user selected value should be negated in the generated query. Example: User: `true`, applyNegated: `true` results in the query for `not true`. <br/>• Defaults to false. <br />• When used as a function, those function gets the current input value and must return a Boolean. |
| `input`        | `String`/`Component` | ✔        | Specifies the component which will be used for the input. Can be a String for predefined Components (TODO link) or a custom one. Read more about custom inputs [here](/Customize/3-Input.md).                                                                                                           |
| `operator`     | `String`             | (✔)      | • Defines the operator used in the generated query. <br/>• defaults to `=` <br/> • Must be one of the following options: `>`, `>=`, `=` or `includes`.<br/> • `<` and `<=` can be achived by negating the input with `applyNegated`.                                                                    |

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
