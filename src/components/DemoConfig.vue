<template>
	<section>
		<div class="config">
			<label>
				<b>addLabel:</b>
				<input v-model="config.addLabel" type="text" />
			</label>
			<label>
				<b>applyLabel:</b>
				<input v-model="config.applyLabel" type="text" />
			</label>
			<label>
				<b>cancleLabel:</b>
				<input v-model="config.cancleLabel" type="text" />
			</label>
			<label>
				<b>removeLabel:</b>
				<input v-model="config.removeLabel" type="text" />
			</label>
			<!--
      <label>
        <b>saveState:</b>
        <input v-model="config.saveState" type="checkbox" />
      </label>
      <label>
        <b>consistentOrder:</b>
        <input v-model="config.consistentOrder" type="checkbox" />
      </label>
			-->
			<label style="width: 100%">
				<b>filter:</b>
				<textarea v-model="filters" />
			</label>
			<button @click="reset">Reset</button>
		</div>
		<p v-if="configError" style="color: red">
			<b>Error:</b>
			{{ configError }}
		</p>
	</section>
</template>

<script>
import { layouts as L, inputs as I } from "../bundle";
const defaultFilter = `[
  {
    title: "Sort",
    chipTemplate: ${"([v1, v2]) => `v1: ${v1} v2: ${v2}`"},
    layout: layouts.Sort,
    required: true,
    filter: [
      {
        // Query data
        attribute: "$sort-attribute",
        //applyNegated: false,
        //operator: "=",
        label: "Sortier-Attribut",

        // UI options

        input: inputs.TriSwitch
      },
      {
        // Query data
        attribute: "$sort-order",
        //applyNegated: false,
        //operator: "=",
        label: "Sortierreihenfolge",

        // UI options
        options: undefined,
        input: inputs.Toggle
      }
    ]
  },
  {
    title: "Veröffentlicht?",
    chipTemplate: ${'([v1]) => `${v1 ? "is published" : "is unpublished"}`'},
    filter: [
      {
        // Query data
        attribute: "isPublished",
        applyNegated: false,
        operator: "=",
        label: "Veröffentlicht?",

        // UI options
        options: undefined,
        input: inputs.TriSwitch
      }
    ]
  },
  {
    title: "Lists",
    chipTemplate: ([v1, v2]) =>
      ${'`${v1 ? "is temp" : "is persistent"} ${v2 ? "isCool" : "isHot"}`'},
    filter: [
      {
        // Query data
        attribute: "isTemp",
        applyNegated: true,
        operator: "=",
        label: "isTemp",

        // UI options
        options: [
          {
            label: "No",
            value: true
          },
          {
            label: "~",
            value: undefined
          },
          {
            label: "Yes",
            value: false
          }
        ],
        input: inputs.Radio
      },
      {
        // Query data
        attribute: "isCool",
        operator: "=",
        label: "isCool",

        // UI options
        options: [
          {
            label: "Check",
            value: "YES"
          },
          {
            label: "Yes",
            value: "YES YES"
          },
          {
            label: "NO",
            value: "nope :("
          }
        ],
        input: inputs.Checkbox
      }
    ]
  },
  {
    title: "Select",
    chipTemplate: "1: %1; 2: %2",
    filter: [
      {
        // Query data
        attribute: "isDaddy",
        operator: "=",

        // UI options
        options: [
          {
            label: "Daddy",
            value: true
          },
          {
            label: "no daddy",
            value: false
          }
        ],
        input: inputs.Select
      },
      {
        // Query data
        attribute: "isMultiDaddy",
        operator: "=",

        // UI options
        options: [
          {
            label: "Daddy",
            value: "daddy"
          },
          {
            label: "no daddy",
            value: "no daddy"
          }
        ],
        input: inputs.MultiSelect
      }
    ]
	},
	{
    title: "Date",
    chipTemplate: "Date: %1, Time: %2, Datetime: %3",
    filter: [
      {
        attribute: "date",
        operator: "=",
        input: inputs.InputDate
			},
			{
        attribute: "time",
        operator: "=",
        input: inputs.InputTime
      },
			{
        attribute: "datetime",
        operator: "=",
        input: inputs.InputDateTime
			},
    ]
  }
]
`;

export default {
	model: {
		prop: "config",
		event: "input",
	},
	props: {
		config: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			filters: "",
			configError: undefined,
		};
	},
	watch: {
		filters(to) {
			try {
				const parsed = this.parseConfig(to);
				this.$set(this.config, "filter", parsed);
				localStorage.setItem("filterConfig", to);
				this.configError = "";
			} catch (error) {
				this.configError = error;
			}
		},
	},
	created() {
		const storage = localStorage.getItem("filterConfig");
		this.filters = storage ? storage : defaultFilter;
	},
	methods: {
		parseConfig(config) {
			// eslint-disable-next-line no-unused-vars
			const layouts = L;
			// eslint-disable-next-line no-unused-vars
			const inputs = I;
			// both variables defined are both are available during eval()
			const parsed = eval(config);

			return parsed;
		},
		reset() {
			localStorage.clear();
			window.location.reload();
		},
	},
};
</script>

<style lang="scss" scoped>
.config {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	max-width: 100%;
	label {
		padding: 0.5em;
		min-width: 300px;
		display: inline-block;
	}
	textarea {
		width: 100%;
		flex: 1;
		min-height: 15rem;
		border-color: #ccc;
		resize: vertical;
	}
}
</style>
