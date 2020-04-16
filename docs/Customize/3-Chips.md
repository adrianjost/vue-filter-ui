# Custom Chips

## Interface

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

## Example

<<< ~../../src/components/Chips.vue
