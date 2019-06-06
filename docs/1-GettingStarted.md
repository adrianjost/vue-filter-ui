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

### HTML

```html
<template>
  <FeathersFilter />
</template>
```

### Script

```javascript
import Vue from "vue";
import FeathersFilter from "vue-filter-ui";

Vue.use(FeathersFilter);
```

or directly in the component:

```javascript
import FeathersFilter from "vue-filter-ui";

export default {
  components: {
    FeathersFilter
  }
};
```
