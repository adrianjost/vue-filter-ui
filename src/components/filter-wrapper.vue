<template>
  <div class="wrapper">
    <search-filter addLabel="Filter hinzufügen" :filter="JSON.stringify(filter)" @newFilter="updateFilter" :handleUrl="true"/>
    <table width="100%">
      <tr><th>FeathersJS</th><th>URLQuery</th></tr>
      <tr>
        <td><pre>{{JSON.stringify(apiQuery, null, 2)}}</pre></td>
        <td><pre>{{JSON.stringify(urlQuery, null, 2)}}</pre></td>
      </tr>
      <tr class="break-all">
        <td>?{{apiQueryString}}</td>
        <td>?{{urlQueryString}}</td>
      </tr>
    </table>
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
            title: 'MultiSelectionPicker',
            displayTemplate: 'Anbieter: %1',
            property: 'anbieterName',
            multiple: true,
            expanded: true,
            options: [
              ["serlo1", "Serlo 1"],
              ["serlo2", "Serlo 2"],
              ["serlo3", "Serlo 3"],
              ["serlo4", "Serlo 4"],
              ["serlo5", "Serlo 5"],
              ["serlo6", "Serlo 6"],
              ["serlo7", "Serlo 7"],
              ["serlo8", "Serlo 8"],
              ["serlo9", "Serlo 9"]
            ],
            defaultSelection: ["serlo1", "serlo2"]
          },
          {
            type: "select",
            title: 'SingleSelectionPicker',
            displayTemplate: 'Anbieter: %1',
            property: 'hostName',
            multiple: false,
            expanded: true,
            options: [
              ["serlo1", "Serlo 1"],
              ["serlo2", "Serlo 2"],
              ["serlo3", "Serlo 3"],
              ["serlo4", "Serlo 4"]
            ],
            defaultSelection: "serlo3"
          },
          {
            type: "date",
            title: 'Erstellt seit',
            displayTemplate: 'Erstellt seit: %1',
            property: 'createdAt',
            mode: 'from'
          },
          {
            type: "date",
            title: 'Bearbeitet am',
            displayTemplate: 'Bearbeitet: %1 bis: %2',
            property: 'updatedAt',
            mode: 'fromto',
            defaultFromDate: 1521302985,
            defaultToDate: 1521302985
          },
          {
            type: "sort",
            title: 'Sortieren',
            displayTemplate: 'Sortieren nach: %1',
            options: [
              ["createdAt", "Erstellt"],
              ["updatedAt", "Bearbeitet"]
            ],
            defaultSelection: "updatedAt",
            defaultOrder: "DESC"
          },
          {
            type: "limit",
            title: 'Anzahl der Einträge',
            displayTemplate: 'Einträge pro Seite: %1',
            options: [10, 25, 50, 100, 250, 500],
            defaultSelection: 25
          },
          {
            type: "boolean",
            title: 'Mehr',
            options: {
              "publicSubmissions": "Öffentliche Abgaben",
              "teamSubmissions": "Teamabgaben"
            },
            defaultSelection: {
              "publicSubmissions": true
            },
            applyNegated: {
              teamSubmissions: [true, true]
            }
        }],
        apiQuery: {},
        apiQueryString: "",
        urlQuery: {},
        urlQueryString: ""
      };
    },
    methods: {
      updateFilter(newApiQuery, newUrlQuery, newApiQueryString, newUrlQueryString) {
        this.apiQuery = newApiQuery;
        this.urlQuery = newUrlQuery;
        this.apiQueryString = newApiQueryString;
        this.urlQueryString = newUrlQueryString;
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
  table{
    margin-top: 25px;
    width: 100%;
    text-align: left;
    word-break: break-all;
    word-break: break-word;
  }
  .break-all{
    word-break: break-all;
  }
</style>
