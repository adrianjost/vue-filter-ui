# Custom Inputs

## Interface

A custom input must implement the following interface:

### Props

| Prop      | value           | description                                                                                 |
| --------- | --------------- | ------------------------------------------------------------------------------------------- |
| `v-model` |                 | Read the [vue docs](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) |
| `options` | `Array<Object>` | Each Object contains the attributes `value` and `label`.                                    |

## Examples

### Toggle

<<< ~../../src/components/inputs/Toggle.vue

### TriSwitch

<<< ~../../src/components/inputs/TriSwitch.vue
