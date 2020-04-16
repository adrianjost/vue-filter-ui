# Custom Select

## Interface

The Select-Component renders the list of available filters that are not currently applied. The Component must implement the following interface:

### Props

| Prop       | value           | description                                                                             |
| ---------- | --------------- | --------------------------------------------------------------------------------------- |
| `options`  | `Array<Object>` | List of config groups. Take a look on the [#filter](#filter) property for more details. |
| `labelAdd` | `String`        | Passthrough of the attribute [`labelAdd`](#labelAdd)                                    |

### Events

| Event        | value    | description                                                                                             |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `openFilter` | `String` | emits a `groupId` of the filtergroup that should be opened. The `groupId` is defined in `options[i].id` |

## Example

<<< ~../../src/components/Select.vue
