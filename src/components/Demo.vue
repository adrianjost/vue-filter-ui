<template>
	<div class="wrapper">
		<search-filter
			ref="filtercomponent"
			v-model="apiQuery"
			:label-add="config.addLabel"
			:label-apply="config.applyLabel"
			:label-cancle="config.cancleLabel"
			:label-remove="config.removeLabel"
			:handle-url="config.handleUrl"
			:save-state="config.saveState"
			:consistent-order="config.consistentOrder"
			:filter="config.filter"
			:parser="parser"
			@newQuery="/* updateQuery */"
		/>
		<hr />
		<DemoConfig v-model="config" />
		<hr />
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
	</div>
</template>

<script>
import DemoConfig from "./DemoConfig.vue";
import Filter from "./Filter.vue";

import parser from "../parser/FeathersJS";

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
					handleUrl: true,
					saveState: false,
					consistentOrder: true,
			  };
		config.filter = [];
		return {
			parser,
			toggle: false,
			apiQuery: {
				$sort: {
					true: false,
				},
				isTemp: {
					$ne: true,
				},
				isCool: ["YES YES", "nope :("],
				isDaddy: true,
				isMultiDaddy: ["daddy", "no daddy"],
			},
			urlQuery: {},
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
		const events = ["newFilter", "newUrlQuery", "reset"];
		window.addEventListener("load", () => {
			const filter = this.$refs["filtercomponent"].$el;
			events.forEach((event) => {
				filter.addEventListener(event, (e) => {
					this.nativeEvents.unshift(e);
				});
			});
		});
	},
	/*
	methods: {
		updateQuery(query) {
			this.apiQuery = query;
		},
	},
	*/
};
</script>

<!-- CUSTOM MODAL -->
<style lang="scss" scoped>
.custom-modal-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
}
.custom-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	border: 5px solid green;
	box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
}
</style>

<!-- DEMO STYLES -->
<style lang="scss" scoped>
.wrapper {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

pre {
	background: #eee;
}
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
	display: table;
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
