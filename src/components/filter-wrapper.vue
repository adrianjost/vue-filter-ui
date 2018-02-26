<template>
  <div class="wrapper">
    <search-filter addLabel="Filter hinzufügen" :filter="JSON.stringify(filter)" @newFilter="updateFilter"/>
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
          type: "select",
          title: 'Anbieter',
          displayTemplate: 'Anbieter: %1',
          property: 'anbieterName',
          multiple: false,
          options: [
            ["youtube", "Youtube"],
            ["leifi", "Leifi Physik"],
            ["serlo1", "Serlo 1"],
            ["serlo2", "Serlo 2"],
            ["serlo3", "Serlo 3"],
            ["serlo4", "Serlo 4"],
            ["serlo5", "Serlo 5"],
            ["serlo6", "Serlo 6"],
            ["serlo7", "Serlo 7"],
            ["serlo8", "Serlo 8"],
            ["serlo9", "Serlo 9"]
          ]
        },
        {
          type: "date",
          title: 'Erstellt am',
          displayTemplate: 'Erstellt: %1 bis: %2',
          property: 'createdAt'
        },
        {
          type: "date",
          title: 'Bearbeitet am',
          displayTemplate: 'Bearbeitet: %1 bis: %2',
          property: 'updatedAt'
        }
        ],
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
