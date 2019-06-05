# Custom Modal/Dialog

## Interface

A custom modal/dialog must implement the following interface:

### Props

| Prop          | value    | description                                                                        |
| ------------- | -------- | ---------------------------------------------------------------------------------- |
| `title`       | `String` | Name of the group. More details can be found under the [filter](#filter) property. |
| `labelApply`  | `String` | Passthrough of the attribute [`labelApply`](#labelApply).                          |
| `labelCancle` | `String` | Passthrough of the attribute [`labelCancle`](#labelCancle).                        |

### Slots

The Modal component must implement a unnamed slot. (`<slot />`)

### Events

| Event    | value | description                                                                                                                                               |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apply`  | /     | event that triggers an apply of the user input. A new filter query is generated afterwards. The Modal is closed and removed from DOM afterwards (`v-if`). |
| `cancle` | /     | Resets the current user input to the values before opeining the modal. The Modal is closed and removed from DOM afterwards (`v-if`).                      |

## Example

<<< ~../../src/components/Modal.vue
