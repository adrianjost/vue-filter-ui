# Schul-Cloud Search & Filter Module

an universal list view module with searchbar and configurable filter.

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![forthebadge](http://forthebadge.com/images/badges/made-with-vue.svg)](http://forthebadge.com)

## Usage
simply include the module into your project and you can use it.
```
<html>
  <header><meta charset="utf-8"></header>
  <body>
    <content-search readonly="false" title="Guten Tag"/>
    <script src="./dist/search-and-filter.js"></script>
  </body>
</html>
```
### configuration

you can use the following properties to configure the module
#### search `search="true"`
> `{type: Boolean, default: false}`

#### searchConfig `searchConfig="{...}"`
> `{type: Object, default: undefined}`

#### tableview `tableview="true"`
> `{type: Boolean, default: false}`

#### tableConfig `tableConfig="{...}"`
> `{type: Object, default: undefined}`

#### itemsPerPage `itemsPerPage="[...]"`
> `{type: Array, default: [12,24,48,96]}`

#### filter `filter="[...]"`
a list of filters that should be available.
> `{type: Array, default: []}`

#### contentAdapter `tableConfig="{...}"`
a simple function that maps the api responses to the placeholder variables of the module
> `{type: Function, default: undefined}`

## Development Setup

``` bash
# clone repo to your device
> git clone https://github.com/schul-cloud/schulcloud-search-and-filter.git

# install dependencies
> npm install
```

## Build & Development

``` bash
# serve with hot reload at localhost:8080
> npm run dev

# build for production with minification
> npm run build

# build for production and view the bundle analyzer report
> npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How to name your branch

1. Take the id of your github issue (e.g. 2 for [this issue](https://github.com/schul-cloud/schulcloud-content-editor/issues/2))
2. add a short description <br>
=> result: e.g. Branch: "2-real-Loginform"

## Commiting

Default branch: master

1. Go into project folder
2. Run the tests (see above)
3. Commit with a meanigful commit message(!) even at 4 a.m. and not stuff like "dfsdfsf"
4. Checkout to master branch
5. Run `git pull`
6. Checkout to the branch you want to upload
7. run `git rebase -p develop` (not `git merge`!) and solve merge conflicts if needed
8. run `git push`

## Testing
``` bash
# check bundlesize
> npm run test

# run build & check bundlesize
> npm run travis
```
