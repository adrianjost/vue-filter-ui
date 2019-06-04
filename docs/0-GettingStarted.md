# Getting Started

## Install

```bash{2,5}
# yarn
yarn add feathersjs-filter-ui

# npm
npm i --save feathersjs-filter-ui
```

## Usage

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
