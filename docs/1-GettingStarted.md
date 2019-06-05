# Getting Started

## Install

```bash{2,5}
# yarn
yarn add feathersjs-filter-ui

# npm
npm i --save feathersjs-filter-ui
```

## Usage

::: tip Required Attributes

There are some required props. Read more about this in the next chapter "[Configuration](./2-Configuration.md)".

:::

### HTML

```html
<template>
  <FeathersFilter />
</template>
```

### Script

```javascript
import Vue from "vue";
import FeathersFilter from "feathersjs-filter-ui";

Vue.use(FeathersFilter);
```

or directly in the component:

```javascript
import FeathersFilter from "feathersjs-filter-ui";

export default {
  components: {
    FeathersFilter
  }
};
```
