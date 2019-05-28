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
      <template v-slot:modal="{config, vmodel, component, labelApply, labelCancle, methodApply, methodCancle}">
        <div
          class="custom-modal-wrapper"
          @click.self="methodCancle"
        >
          <div class="custom-modal">
            Custom Modal - {{ config.title }}
            <component
              :is="component"
              v-model="vmodel"
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
		"title": "Dual",
		"chipTemplate": (value) => `Boolean: ${value ? "+" : (value === false ? "-": "o")}`,
		// design: "sort",
		filter: [
			{
				// Query data
				"attribute": "",
				"applyNegated": false,
				"operator": "=",
				"value": undefined,

				// UI options
				"options": undefined,
				"design": "TriSwitch",
			},
			{
				// Query data
				"attribute": "",
				"applyNegated": false,
				"operator": "=",
				"value": undefined,

				// UI options
				"options": undefined,
				"design": "Toggle",
			}
		]
	},
	/*
  {
		// Root Options
		"title": "TriSwitch",
		"chipTemplate": (value) => `Boolean: ${value ? "+" : (value === false ? "-": "o")}`,

		// Query data
		"attribute": "",
		"applyNegated": false,
		"operator": "=",
		"value": undefined,

		// UI options
		"options": undefined,
		"design": "TriSwitch",
	},
	{
		// Root Options
		"title": "Toggle",
		"chipTemplate": (value) => `Boolean: ${value ? "+" : (value === false ? "-": "o")}`,

		// Query data
		"attribute": "",
		"applyNegated": false,
		"operator": "=",
		"value": undefined,

		// UI options
		"options": undefined,
		"design": "Toggle",
	}
	*/
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
			config: localStorage.getItem("config") && false
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
