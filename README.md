# Schul-Cloud Search & Filter Module

an universal configurable filter module that will fire an event 
and gives you a FeathersJS query that you should apply.

[![forthebadge](http://forthebadge.com/images/badges/made-with-vue.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## Usage
simply include the module into your project and you can use it.
Then add an eventListener to watch for new querys.
```
<html>
  <header><meta charset="utf-8"></header>
  <body>
    <content-search id="filter"/>
    <script src="./search-and-filter.js"></script>
    <script>
      document.getElementById("filter").addEventListener('newFilter', (e) => {
        // APPLY QUERE HERE...
        console.log("filter:",e.detail[0]);
      })
    </script>
  </body>
</html>
```

## configuration

### handleUrl `handle-url="..."`

should the component update the url, of the window it is mounted, 
for you or do you wan't to handle it yourself?

> `{type: Boolean, default: false}`

### filter `filter="[...]"`
you can use the "filter" property to configure the available filter. 
The property should be a stringified JSON Object. 

> `{type: Array, default: []}`

You can use as many of each type as you want, but at the moment you only have the following filter types. 



#### date
filter for an date range
```
filter="[
  {
    title: 'Created at'                       // required
    displayTemplate: 'created from %1 to %2', // required
    property: 'createdAt',                    // required
    minDate: (UNIX TIMESTAMP),                // default: today
    maxDate: (UNIX TIMESTAMP)                 // default: today
  }
]" 
```
if you set minDate or maxDate to `false` the related input is hidden.

#### value is ...
let the user choose an value for a variable
```
filter="[
  {
    title: 'Class'                 // required
    displayTemplate: 'class: %1',  // required
    property: 'classId',           // required
    multiple: true,                // default: false
    options: [                     // default: [], minLength: 1!
      [123, "Class A"],
      [456, "Class B"],
      [789, "Class C"],
    ]
  }
]" 
```

## Development Setup

``` bash
# clone repo to your device
> git clone https://github.com/schul-cloud/schulcloud-filter-module.git

# go to directory
> cd schulcloud-filter-module

# install dependencies
> npm install
```

## Build & Development

``` bash
# serve with hot reload at localhost:8080
> npm run dev

# build for production with minification
> npm run build
```

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
