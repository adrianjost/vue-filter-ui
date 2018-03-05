<template>
  <div class="filter">
    <md-chip v-for="chip in activeFilter" v-model="activeFilter" :key="chip[0]" v-on:click="visibleFilter = chip[0]"
             @md-delete.stop="removeFilter(chip[0], true)" md-clickable md-deletable>{{ chip[1].displayString }}
    </md-chip>

    <md-menu md-direction="bottom-end">
      <md-button md-menu-trigger class="add-filter">
        <md-icon><i class="material-icons">add</i></md-icon>
        {{addLabel}}
      </md-button>
      <md-menu-content>
        <md-menu-item v-for="(filter) in availableFilter"
                      :key="('Option-'+filter.type + '-' + filter.property)"
                      v-if="!isApplied(filter.type + '-' + filter.property)"
                      v-on:click="visibleFilter = (filter.type + '-' + filter.property)">
                      {{filter.title}}...
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <component v-for="filter in availableFilter"
               :key="('Dialog-'+filter.type + '-' + filter.property)"
               v-bind:is="filter.type"
               v-bind:active="visibleFilter == (filter.type + '-' + filter.property)"
               :identifier="(filter.type + '-' + filter.property)"
               :config="filter"
               @set="setFilter"
               @cancle="cancle"/>
  </div>
</template>

<script>
  import selectPicker from '@/components/filter/select.vue';
  import datePicker from '@/components/filter/date.vue';
  import sortPicker from '@/components/filter/sort.vue';
  import booleanPicker from '@/components/filter/boolean.vue';
  const qs = require('query-string');

  export default {
    components: {
      'filter-select': selectPicker,
      'filter-date': datePicker,
      'filter-sort': sortPicker,
      'filter-boolean': booleanPicker
    },
    props: {
      "addLabel": {type: String, default: "add filter"},
      "applyLabel": {type: String, default: "apply"},
      "cancleLabel": {type: String, default: "cancle"},
      "handleUrl": { type: Boolean, default: false },
      "filter": { type: String, default: "[]" },
    },
    name: 'searchFilter',
    data() {
      return {
        visibleFilter: '',
        activeFilter: [],
        availableFilter: [],
      };
    },
    created(){
      this.availableFilter = JSON.parse(this.filter).map((filter)=>{
        filter.type = "filter-"+filter.type;
        return filter;
      })
    },
    methods: {
      setFilter(identifier, filterData) {
        this.visibleFilter = '';

        filterData = JSON.parse(JSON.stringify(filterData)); // deep copy

        this.removeFilter(identifier, false);
        this.activeFilter.push([identifier, filterData]);
      },
      removeFilter(key, emit) {
        this.activeFilter = this.activeFilter.filter(item => item[0] != key);
        if (emit) {
          this.$emit('reset', key);
        }
      },
      cancle() {
        this.visibleFilter = '';
      },
      sendNewQuery() {
        const apiQuery = {};
        const urlQuery = {};
        this.activeFilter.forEach((value) => {
          Object.assign(apiQuery, value[1].apiQuery);
          Object.assign(urlQuery, value[1].urlQuery);
        }, {});
        // TODO: handle URL query string
        this.$emit('newFilter', apiQuery, urlQuery, qs.stringify(apiQuery), qs.stringify(urlQuery));
      },
      isApplied(identifier) {
        return this.activeFilter.map(i => i[0]).includes(identifier);
      },
    },
    watch: {
      activeFilter(to, from) {
        this.sendNewQuery();
      },
    },
  };

</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import "../default";
</style>
<style lang="scss" scoped>
/* ENTER CUSTOM CSS HERE */
.add-filter{
  vertical-align: middle;
}
</style>
