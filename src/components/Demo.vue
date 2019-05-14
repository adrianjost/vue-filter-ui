<template>
  <div class="wrapper">
    <search-filter
      ref="filtercomponent"
      :add-label="addLabel"
      :applyLabel="applyLabel"
      :cancleLabel="cancleLabel"
      :handle-url="handleUrl"
      :saveState="saveState"
      :consistentOrder="consistentOrder"
      :filter="filter"
      @newFilter="updateFilter"
    />
    <hr />
    <section>
        <div class="config">
          <label>
            <b>addLabel:</b>
            <input type="text" v-model="addLabel">
          </label>
          <label>
            <b>applyLabel:</b>
            <input type="text" v-model="applyLabel">
          </label>
          <label>
            <b>cancleLabel:</b>
            <input type="text" v-model="cancleLabel">
          </label>
          <label>
            <b>handleUrl:</b>
            <input type="checkbox" v-model="handleUrl">
          </label>
          <label>
            <b>saveState:</b>
            <input type="checkbox" v-model="saveState">
          </label>
          <label>
            <b>consistentOrder:</b>
            <input type="checkbox" v-model="consistentOrder">
          </label>
          <label style="width: 100%">
            <b>filter:</b>
            <textarea v-model="filterString"></textarea>
          </label>
        </div>
      <p style="color: red" v-if="configError"><b>Error:</b> {{configError}}</p>
    </section>
    <hr />
    <table width="100%">
      <tr><th>FeathersJS</th><th>URLQuery</th></tr>
      <tr>
        <td><pre>{{ JSON.stringify(apiQuery, null, 2) }}</pre></td>
        <td><pre>{{ JSON.stringify(urlQuery, null, 2) }}</pre></td>
      </tr>
    </table>
    <div class="events">
      <b>Native Events</b>
      <p
        v-for="event in nativeEvents"
        :key="event.timeStamp"
        class="event"
      >
        ({{ parseInt(event.timeStamp) }}) <b>{{ event.type }}:</b>
        <code>
          {{ JSON.stringify(event.detail, null, 2) }}
        </code>
      </p>
    </div>
  </div>
</template>

<script>
import Filter from './Filter.vue';

export default {
    components: {
      'search-filter': Filter,
    },
    data() {
      return {
        filter: [{
            type: "select",
            title: 'Multi Select',
            displayTemplate: 'Selections: %1',
            property: 'prop1',
            multiple: true,
            expanded: true,
            options: [
              ["option-1", "option 1"],
              ["option-2", "option 2"],
              ["option-3", "option 3"],
              ["option-4", "option 4"],
              ["option-5", "option 5"],
              ["option-6", "option 6"],
              ["option-7", "option 7"],
              ["option-8", "option 8"],
              ["option-9", "option 9"]
            ],
            defaultSelection: ["option-1", "option-2"]
          },
          {
            type: "select",
            title: 'Single Select',
            displayTemplate: 'Selection: %1',
            property: 'prop2',
            multiple: false,
            expanded: true,
            options: [
              ["option-1", "option 1"],
              ["option-2", "option 2"],
              ["option-3", "option 3"],
              ["option-4", "option 4"]
            ],
            defaultSelection: "option-3"
          },
          {
            type: "date",
            title: 'Date From',
            displayTemplate: 'Date starting at: %1',
            property: 'createdAt',
            mode: 'from'
          },
          {
            type: "date",
            title: 'Date from to',
            displayTemplate: 'Date from: %1 to: %2',
            property: 'updatedAt',
            mode: 'fromto',
            defaultFromDate: new Date(),
            defaultToDate: new Date()
          },
          {
            type: "sort",
            title: 'Sort',
            displayTemplate: 'sort by: %1',
            options: [
              ["createdAt", "created"],
              ["updatedAt", "updated"]
            ],
            defaultSelection: "updatedAt",
            defaultOrder: "DESC"
          },
          {
            type: "limit",
            title: '$limit',
            displayTemplate: 'Items per page: %1',
            options: [10, 25, 50, 100, 250, 500],
            defaultSelection: 25
          },
          {
            type: "boolean",
            title: 'Boolean',
            options: {
              "publicSubmissions": "Public submissions",
              "teamSubmissions": "Team submissions"
            },
            defaultSelection: {
              "publicSubmissions": true
            },
            applyNegated: {
              teamSubmissions: [true, true]
            }
        }],
        apiQuery: {},
        urlQuery: {},
        nativeEvents: [],
        addLabel: undefined,
        applyLabel: undefined,
        cancleLabel: undefined,
        handleUrl: true,  
        saveState:false,  
        consistentOrder: true,  
        configError: undefined
      };
    },
    computed: {
      filterString: {
        get(){
          return JSON.stringify(this.filter, null, 2);
        },
        set(to){
          try{
            this.filter = JSON.parse(to)
          }catch(error){
            this.configError = error;
          }
        }
      }
    },
    mounted(){
      // test native event handling
      const events = ["newFilter", "newUrlQuery", "reset"];
      window.addEventListener("load", () => {
        const filter = this.$refs["filtercomponent"].$el
        events.forEach((event) => {
          filter.addEventListener(event, (e) => {
            this.nativeEvents.unshift(e);
          });
        })
      });
    },
    methods: {
      updateFilter([newApiQuery, newUrlQuery]) {
        this.apiQuery = newApiQuery;
        this.urlQuery = newUrlQuery;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper{
  margin: 25px;
  padding: 25px;
  border: 1px dashed lightgrey;
  border-radius: 5px;
}
.config{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 100%;
  label{
    padding: .5em;
    min-width: 300px;
    display: inline-block;
  }
  textarea{
    width: 100%;
    flex: 1;
    min-height: 15rem;
    background: url(http://i.imgur.com/2cOaJ.png);
    background-attachment: local;
    background-repeat: no-repeat;
    padding-left: 35px;
    padding-top: 10px;
    border-color:#ccc;
    resize: vertical;
  }
}
hr{
  border: none;
  background: transparent;
  border-bottom: 1px dashed lightgrey;
  margin: 1rem 0; 
}
table{
  margin-top: 25px;
  width: 100%;
  text-align: left;
  word-break: break-all;
  word-break: break-word;
}
.pre{
  overflow: auto;
}
.events{
  max-height:350px;
  overflow-y: auto;
  .event{
    margin: 0;
    padding: 8px;
    background-color: rgba(0,0,0,.05);
    &:nth-of-type(2n){
      background-color: rgba(0,0,0,.25);
    }
  }
}
</style>
