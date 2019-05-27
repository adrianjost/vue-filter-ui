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
        {{ labelAdd }}
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


    <slot
      v-if="!!visibleFilter"
      name="modal"
      :config="openModalConfig"
      :labelApply="labelApply"
      :labelCancle="labelCancle"
      :component="components[openModalConfig.type]"
      :methodApply="onConfirm"
      :methodCancle="onCancle"
    >
      <md-dialog
        :md-active="!!visibleFilter"
        @md-clicked-outside="visibleFilter = ''"
      >
        <md-dialog-title>{{ openModalConfig.title }}</md-dialog-title>

        <component
          :is="components[openModalConfig.type]"
          :config="openModalConfig"
        />

        <md-dialog-actions>
          <md-button @click="onCancle">
            {{ labelCancle }}
          </md-button>
          <md-button
            class="md-primary"
            @click="onConfirm"
          >
            {{ labelApply }}
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </slot>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdDialog, MdButton, MdMenu, MdChips, MdIcon } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
Vue.use(MdDialog)
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

const components = {
  'filter-select': selectPicker,
  'filter-date': datePicker,
  'filter-sort': sortPicker,
  'filter-boolean': booleanPicker,
  'filter-limit': limitPicker,
};

export default {
  components,
  props: {
    "labelAdd": {type: String, default: "add filter"},
    "labelApply": {type: String, default: "apply"},
    "labelCancle": {type: String, default: "cancle"},
    "handleUrl": { type: Boolean },
    "saveState": { type: Boolean },
    "consistentOrder": {type: Boolean, default: true},
    "filter": { type: [String, Array] , default: defaultFilter },
  },
  data() {
    return {
      components,
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
				if(!filter.type.startsWith("filter-")){
					filter.type = "filter-"+filter.type;
				}
        return filter;
      });
    },
    selectableFilter(){
      return this.availableFilter.filter((filter) => !this.isApplied(this.getIdentifier(filter)));
		},
		openModalConfig(){
			return this.availableFilter.find((filter) => this.visibleFilter === this.getIdentifier(filter)) || {}
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
		onConfirm() {
        let displayString;
        this.apiQuery = {};
        this.urlQuery = {};
        if(Object.keys(this.selections).length) {
          for (var property in this.selections) {
            if (this.selections[property] !== undefined) {
              if (this.config.applyNegated[property]) {
                const negate = this.config.applyNegated[property][(this.selections[property]) ? 1 : 0];
                const configuredProperty = ((negate) ? (property + '[$ne]') : property)
                const configuredSelection = ((negate) ? (!this.selections[property]) : (this.selections[property]))
                this.apiQuery[configuredProperty] = configuredSelection;
              } else {
                this.apiQuery[property] = this.selections[property];
              }


              this.urlQuery[property] = this.selections[property];
              displayString = ((displayString) ? (displayString + ", ") : "") + `${this.config.options[property]}: ${(this.selections[property]) ? '✔' : '✖'}`;
            }
          }
          this.$emit('set', this.identifier, {
            apiQuery: this.apiQuery,
            urlQuery: this.urlQuery,
            displayString
          });
        }
      },
		onCancle() {
			this.visibleFilter = "";
		},
    getIdentifier(filter){
      const filterIndex = this.availableFilter.findIndex((a) => a === filter);
      return '#' + filterIndex + "-" + filter.type + '-' + (filter.property || `$${filter.type.replace("filter-", "")}`);
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
