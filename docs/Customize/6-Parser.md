# Parser

parsers are used to generate the language specific query from the abstract config object. They are also used to initialy populate the ui with values from an existing query.

## available Parsers

- [FeathersJS](https://feathersjs.com/)

## extend a parser

the general concept of the parser is, that it loops about each input-group, generates a query from it and appends this query to the global query.
If you have a use-case that is not covered by an existing parser, you can extend it by passing a parser option to the input group.
This option must be an Object with two functions specified:

```js
parser: {
  generator: (filterGroupConfig, values) => {
    return; /* query */
  };
}
```

- The `filterGroupConfig` parameter contains an config object of the filter group.
- `values` is an Object, containing the input values. You can access the value by `values[filterGroupConfig[i].id]`.

## custom parser
