<template>
  <div
    ref="filter-module"
    class="filter"
    @getFilter="sendNewQuery"
  >
    <md-chip
      v-for="chip in activeFilter"
      :key="chip[0]"
      v-model="activeFilter"
      md-clickable
      md-deletable
      @click="visibleFilter = chip[0]"
      @md-delete.stop="removeFilter(chip[0], true)"
    >
      {{ chip[1].displayString }}
    </md-chip>

    <md-menu
      v-if="selectableFilter.length"
      md-direction="bottom-end"
    >
      <md-button
        md-menu-trigger
        class="add-filter"
      >
        <md-icon><i class="material-icons">add</i></md-icon>
        {{ addLabel }}
      </md-button>
      <md-menu-content>
        <md-menu-item
          v-for="(filterOption) in selectableFilter"
          :key="'Option-' + getIdentifier(filterOption)"
          @click="visibleFilter = getIdentifier(filterOption)"
        >
          {{ filterOption.title }}...
        </md-menu-item>
      </md-menu-content>
    </md-menu>

    <component
      :is="filterDialog.type"
      v-for="(filterDialog) in availableFilter"
      :key="'Dialog-' + getIdentifier(filterDialog)"
      :active="visibleFilter === getIdentifier(filterDialog)"
      :identifier="getIdentifier(filterDialog)"
      :config="filterDialog"
      @set="setFilter"
      @cancle="cancle"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { MdButton, MdMenu, MdChips, MdIcon } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
Vue.use(MdButton)
Vue.use(MdMenu)
Vue.use(MdChips)
Vue.use(MdIcon)

import selectPicker from '@/components/filter/select.vue';
import datePicker from '@/components/filter/date.vue';
import sortPicker from '@/components/filter/sort.vue';
import booleanPicker from '@/components/filter/boolean.vue';
import limitPicker from '@/components/filter/limit.vue';
const qs = require('query-string');

const defaultFilter = [
	{
		type: "boolean",
		title: "more",
		options: { propertyA: "Label A", propertyB: "Label B" },
	},
]

export default {
  components: {
    'filter-select': selectPicker,
    'filter-date': datePicker,
    'filter-sort': sortPicker,
    'filter-boolean': booleanPicker,
    'filter-limit': limitPicker,

  },
  props: {
    "addLabel": {type: String, default: "add filter"},
    "applyLabel": {type: String, default: "apply"},
    "cancleLabel": {type: String, default: "cancle"},
    "handleUrl": { type: Boolean },
    "saveState": { type: Boolean },
    "consistentOrder": {type: Boolean},
    "filter": { type: [String, Array] , default: defaultFilter },
  },
  data() {
    return {
      visibleFilter: '',
      activeFilter: [],
      isWatching: true,
      pageIdentifier: `ffilter-${window.location.origin} + ${window.location.pathname}`,
    };
  },
  computed: {
    availableFilter(){
      const filterSettings = (typeof this.filter === "string") ? JSON.parse(this.filter) : this.filter;
      return filterSettings.map((filter)=>{
        filter.type = "filter-"+filter.type;
        return filter;
      });
    },
    selectableFilter(){
      return this.availableFilter.filter((filter) => !this.isApplied(this.getIdentifier(filter)));
    }
  },
  watch: {
    activeFilter() {
      if(this.isWatching){
        this.sendNewQuery();
      }
    },
  },
  mounted(){
    if(this.handleUrl){
      window.onhashchange = this.newUrlQuery;
    }
    if(this.saveState){
      const savedState = localStorage.getItem(this.pageIdentifier);
      if(savedState){
        window.history.replaceState(null , null, savedState);
      }
    }
    this.newUrlQuery();
  },
  methods: {
    getIdentifier(filter){
      return '#' + filter.type + '-' + (filter.property || `$${filter.type.replace("filter-", "")}`);
    },
    setFilter(identifier, filterData) {
      this.visibleFilter = '';

      filterData = JSON.parse(JSON.stringify(filterData)); // deep copy

      this.removeFilter(identifier, false);
      this.activeFilter.push([identifier, filterData]);
      if(this.consistentOrder){
        this.activeFilter.sort((a, b) => a[0].localeCompare(b[0]));
      }
    },
    removeFilter(key, emit) {
      this.activeFilter = this.activeFilter.filter(item => item[0] != key);
      if (emit) {
        this.sendEvent("reset", key);
      }
    },
    cancle() {
      this.visibleFilter = '';
    },
    sendEvent(event, data){
      this.$emit(event,data);
      this.$refs["filter-module"].dispatchEvent(new CustomEvent(event, {detail: data}));
    },
    sendNewQuery() {
      const apiQuery = {};
      const urlQuery = {};
      this.activeFilter.forEach((value) => {
        Object.assign(apiQuery, value[1].apiQuery);
        Object.assign(urlQuery, value[1].urlQuery);
      }, {});
      if (this.handleUrl && history.pushState) {
        window.history.replaceState(null , null, `#?${qs.stringify(urlQuery)}`);
      }
      if(this.saveState){
        localStorage.setItem(this.pageIdentifier, window.location.hash);
      }

      this.sendEvent("newFilter", [apiQuery, urlQuery]);
    },
    isApplied(identifier) {
      return this.activeFilter.map(i => i[0]).includes(identifier);
    },
    newUrlQuery(){
      this.isWatching = false;
      this.activeFilter = [];
      this.isWatching = true;
      this.sendEvent('reset');
      this.sendEvent("newUrlQuery", (qs.parse(location.hash.slice(1)) || {}));
    }

  },
};
</script>

<style lang="scss">
@import '@/styles/default.scss';
</style>
<style lang="scss" scoped>
/* ENTER CUSTOM CSS HERE */
.add-filter{
  vertical-align: middle;
  margin-bottom: 8px;
}
.md-chip{
  margin-bottom: 8px;
}
</style>
