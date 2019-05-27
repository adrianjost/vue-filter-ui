<template>
  <div class="wrapper">
    <search-filter
      ref="filtercomponent"
      :label-add="config.addLabel"
      :label-apply="config.applyLabel"
      :label-cancle="config.cancleLabel"
      :handle-url="config.handleUrl"
      :save-state="config.saveState"
      :consistent-order="config.consistentOrder"
      :filter="config.filter"
      @newFilter="updateFilter"
    >
      <template v-slot:modal="{config, component, labelApply, labelCancle, methodApply, methodCancle}">
        <div
          class="custom-modal-wrapper"
          @click="methodCancle"
        >
          <div class="custom-modal">
            Custom Modal - {{ config.title }}
            <component
              :is="component"
              :config="config"
            />
            <button @click="methodCancle">
              {{ labelCancle }}
            </button>
            <button @click="methodApply">
              {{ labelApply }}
            </button>
          </div>
        </div>
      </template>

      <template v-slot:hi="{ config, components }">
        <span @click="toggle = !toggle">
          Ho ^^ {{ config }} {{ components }}</span>
        <component
          :is="components[config.type]"
          :active.sync="toggle"
          :config="config"
          :identifier="config.property"
        />
      </template>
    </search-filter>
    <hr>
    <DemoConfig v-model="config" />
    <hr>
    <table width="100%">
      <tr>
        <th>FeathersJS</th>
        <th>URLQuery</th>
      </tr>
      <tr>
        <td>
          <pre>{{ JSON.stringify(apiQuery, null, 2) }}</pre>
        </td>
        <td>
          <pre>{{ JSON.stringify(urlQuery, null, 2) }}</pre>
        </td>
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
import DemoConfig from "./DemoConfig.vue";
import Filter from "./Filter.vue";

const defaultFilter = [
  {
    type: "select",
    title: "Multi Select",
    displayTemplate: "Selections: %1",
    property: "prop1",
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
    title: "Single Select",
    displayTemplate: "Selection: %1",
    property: "prop2",
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
    title: "Date From",
    displayTemplate: "Date starting at: %1",
    property: "createdAt",
    mode: "from"
  },
  {
    type: "date",
    title: "Date from to",
    displayTemplate: "Date from: %1 to: %2",
    property: "updatedAt",
    mode: "fromto",
    defaultFromDate: new Date(),
    defaultToDate: new Date()
  },
  {
    type: "sort",
    title: "Sort",
    displayTemplate: "sort by: %1",
    options: [["createdAt", "created"], ["updatedAt", "updated"]],
    defaultSelection: "updatedAt",
    defaultOrder: "DESC"
  },
  {
    type: "limit",
    title: "$limit",
    displayTemplate: "Items per page: %1",
    options: [10, 25, 50, 100, 250, 500],
    defaultSelection: 25
  },
  {
    type: "boolean",
    title: "Boolean",
    options: {
      publicSubmissions: "Public submissions",
      teamSubmissions: "Team submissions"
    },
    defaultSelection: {
      publicSubmissions: true
    },
    applyNegated: {
      teamSubmissions: [true, true]
    }
  }
];
export default {
  components: {
    DemoConfig,
    "search-filter": Filter
  },
  data() {
    return {
      toggle: false,
      apiQuery: {},
      urlQuery: {},
			nativeEvents: [],
			config: localStorage.getItem("config")
				? JSON.parse(localStorage.getItem("config"))
				: {
					addLabel: undefined,
					filter: defaultFilter,
					applyLabel: undefined,
					cancleLabel: undefined,
					handleUrl: true,
					saveState: false,
					consistentOrder: true,
				}
    };
  },
  mounted() {
    // test native event handling
    const events = ["newFilter", "newUrlQuery", "reset"];
    window.addEventListener("load", () => {
      const filter = this.$refs["filtercomponent"].$el;
      events.forEach(event => {
        filter.addEventListener(event, e => {
          this.nativeEvents.unshift(e);
        });
      });
    });
  },
  methods: {
    updateFilter([newApiQuery, newUrlQuery]) {
      this.apiQuery = newApiQuery;
      this.urlQuery = newUrlQuery;
    }
  }
};
</script>

<!-- CUSTOM MODAL -->
<style lang="scss" scoped>
.custom-modal-wrapper{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.2);
}
.custom-modal{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	border: 5px solid green;
	box-shadow: 0 0 100px rgba(0,0,0,.5);
}
</style>

<!-- DEMO STYLES -->
<style lang="scss" scoped>
.wrapper {
  margin: 25px;
  padding: 25px;
  border: 1px dashed lightgrey;
  border-radius: 5px;
}
hr {
  border: none;
  background: transparent;
  border-bottom: 1px dashed lightgrey;
  margin: 1rem 0;
}
table {
  margin-top: 25px;
  width: 100%;
  text-align: left;
  word-break: break-all;
  word-break: break-word;
}
.pre {
  overflow: auto;
}
.events {
  max-height: 350px;
  overflow-y: auto;
  .event {
    margin: 0;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.05);
    &:nth-of-type(2n) {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
