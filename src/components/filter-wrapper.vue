<template>
  <div class="wrapper">
    <search-filter @newFilter="updateFilter"/>
    <p><b>FeathersJS:</b> {{JSON.stringify(filterQuery)}}</p>
    <p><b>URLQuery:</b> {{JSON.stringify(urlQuery)}}</p>
  </div>
</template>

<script>
  import filter from './filter.vue';

  export default {
    components: {
      'search-filter': filter,
    },
    name: 'contentList',
    data() {
      return {
        filter: [{

        }],
        filterQuery: {},
        urlQuery: {}
      };
    },
    methods: {
      updateFilter(newApiQuery, newUrlQuery) {
        this.filterQuery = newApiQuery;
        this.urlQuery = newUrlQuery;
      },
    },
  };
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import "../default";
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrapper{
    margin: 25px;
    padding: 25px;
    border: 1px dashed lightgrey;
    border-radius: 5px;
    .filter{
      padding-bottom: 25px;
      border-bottom: 1px dashed lightgrey;
    }
  }
</style>
