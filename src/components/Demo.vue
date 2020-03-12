<template>
	<div class="wrapper">
		<search-filter
			ref="filtercomponent"
			v-model="query"
			:label-add="config.addLabel"
			:label-apply="config.applyLabel"
			:label-cancle="config.cancleLabel"
			:label-remove="config.removeLabel"
			:save-state="config.saveState"
			:consistent-order="config.consistentOrder"
			:filter="config.filter"
			:parser="parser"
		/>
		<hr />
		<DemoConfig v-model="config" />
		<hr />
		<div>
			<h4>Filter Query</h4>
			<pre>{{ JSON.stringify(query, null, "\t") }}</pre>
		</div>
	</div>
</template>

<script>
import DemoConfig from "./DemoConfig.vue";
import Filter from "./Filter.vue";

import parser from "../parser/default";

export default {
	components: {
		DemoConfig,
		"search-filter": Filter,
	},
	data() {
		const config = localStorage.getItem("config")
			? JSON.parse(localStorage.getItem("config"))
			: {
					addLabel: undefined,
					filter: [],
					applyLabel: undefined,
					cancleLabel: undefined,
			  };
		config.filter = [];
		return {
			parser,
			toggle: false,
			query: [
				{
					attribute: "$sort",
					value: "true",
					operator: "=",
				},
				{
					attribute: "isTemp",
					value: "true",
					operator: "=",
					applyNegated: true,
				},
				{
					attribute: "isCool",
					value: "YES YES",
					operator: "=",
				},
				{
					attribute: "isDaddy",
					value: "no daddy",
					operator: "=",
				},
			],
			nativeEvents: [],
			config,
		};
	},
	watch: {
		config: {
			deep: true,
			handler(to) {
				localStorage.setItem("config", JSON.stringify(to));
			},
		},
	},
	mounted() {
		// test native event handling
		const events = ["newFilter", "newQuery", "reset"];
		window.addEventListener("load", () => {
			const filter = this.$refs["filtercomponent"].$el;
			events.forEach((event) => {
				filter.addEventListener(event, (e) => {
					this.nativeEvents.unshift(e);
				});
			});
		});
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	margin: 25px;
	padding: 25px;
	border: 1px dashed lightgrey;
	border-radius: 5px;
	hr {
		border: none;
		background: transparent;
		border-bottom: 1px dashed lightgrey;
		margin: 1rem 0;
	}
	pre {
		padding: 8px;
		border-radius: 4px;
		tab-size: 2;
		max-height: 350px;
		overflow: auto;
		color: #fff;
		background-color: #282c34;
	}
}
</style>
