<template>
	<div class="filter">
		<div class="row">
			<component
				:is="componentChips"
				v-if="chips.length > 0"
				:chips="chips"
				class="chips"
				@open="openFilter"
				@remove="handleRemove"
			/>

			<component
				:is="componentSelect"
				:label-add="labelAdd"
				:options="unusedFilters"
				class="filter-select"
				@openFilter="openFilter"
			/>
		</div>

		<component
			:is="componentModal"
			v-if="openGroup"
			:title="openGroup.title"
			:label-apply="labelApply"
			:label-cancel="labelCancel"
			:label-remove="labelRemove"
			@apply="handleApply"
			@cancel="handleCancel"
			@remove="handleRemove(openGroup.id)"
		>
			<component :is="openGroup.layout" class="layout">
				<template
					v-for="(input, index) in openGroup.filter"
					v-slot:[getSlotName(index)]
				>
					<!-- eslint-disable vue/valid-v-for -->
					<component
						:is="input.input"
						:key="input.label"
						v-model="tmpValues[input.id]"
						:options="input.options"
						:label="input.label"
						v-bind="input.attributes"
					/>
					<!-- eslint-enable vue/valid-v-for -->
				</template>
			</component>
		</component>
	</div>
</template>

<script>
import DefaultSelect from "./Select";
import DefaultChips from "./Chips";
import DefaultModal from "./Modal";
import DefaultLayout from "./layouts/default";

import klona from "klona";

export default {
	model: {
		prop: "query",
		event: "newQuery",
	},
	props: {
		labelAdd: { type: String, default: "add filter" },
		labelApply: { type: String, default: "apply" },
		labelCancel: { type: String, default: "cancel" },
		labelRemove: { type: String, default: "remove" },
		filter: { type: Array, required: true },
		componentSelect: {
			type: Object,
			default: () => DefaultSelect,
		},
		componentChips: {
			type: Object,
			default: () => DefaultChips,
		},
		componentModal: {
			type: Object,
			default: () => DefaultModal,
		},
		parser: {
			type: Object,
			required: true,
			validator: (parser) => {
				return ["generator", "parser"].every(
					(attr) => typeof parser[attr] === "function"
				);
			},
		},
		query: {
			type: [Array, Object, String],
			required: true,
		},
	},
	data() {
		return {
			openGroupId: undefined,
			filterValues: {},
			values: {},
			tmpValues: {},
		};
	},
	computed: {
		active: {
			get() {
				return !!this.openGroupId;
			},
			set(to) {
				if (!to) {
					this.openGroupId = undefined;
				}
			},
		},
		openGroup() {
			return this.openGroupId
				? this.internalConfig.find((filter) => filter.id === this.openGroupId)
				: undefined;
		},
		internalConfig() {
			return this.filter.map((orgFilter, groupIndex) => {
				let filter = { ...orgFilter };

				// normalize structure
				if (!Array.isArray(filter.filter)) {
					filter = {
						title: filter.title,
						parser: filter.parser,
						chipTemplate: filter.chipTemplate,
						filter: [filter],
					};
				}

				// add identifier
				filter.id = `group-${groupIndex}`;
				// resolve input wrapper component
				/*
				// TODO I would like to have this functionality, but it doesn't work in a library build
				if (typeof filter.layout !== "function") {
					const name = filter.layout || "default";
					filter.layout = () => import(`./layouts/${name}.vue`);
				}
				*/
				if (!filter.layout) {
					filter.layout = DefaultLayout;
				}

				// resolve input components
				filter.filter = filter.filter.map((orgSubFilter, inputIndex) => {
					const subFilter = { ...orgSubFilter };
					subFilter.id = `input-${groupIndex}-${inputIndex}`;
					/*
					// TODO I would like to have this functionality, but it doesn't work in a library build
					if (typeof subFilter.input === "string") {
						const name = subFilter.input;
						subFilter.input = () => import(`./inputs/${name}.vue`);
					}
					*/
					if (typeof subFilter.applyNegated !== "function") {
						const applyNegated = subFilter.applyNegated;
						subFilter.applyNegated = () => !!applyNegated;
					}
					return subFilter;
				});

				return filter;
			});
		},
		chips() {
			return this.activeGroups.map((groupId) => {
				const group = this.internalConfig.find((group) => group.id === groupId);
				const values = group.filter.map((a) => this.values[a.id]);
				const label =
					typeof group.chipTemplate === "function"
						? group.chipTemplate
						: (values) => {
								let out = group.chipTemplate;
								values.forEach((value, index) => {
									if (Array.isArray(value)) {
										value = value.join(", ");
									}
									out = out.replace(`%${index + 1}`, value);
								});
								return out;
						  };
				return {
					id: group.id,
					deletable: !group.required,
					label: label(values),
				};
			});
		},
		activeGroups() {
			// set every group that has a value as active
			return this.internalConfig
				.filter((group) => {
					return group.filter.some(
						(input) => this.values[input.id] !== undefined
					);
				})
				.map((group) => group.id);
		},
		unusedFilters() {
			return this.internalConfig.filter((group) => {
				return !this.activeGroups.includes(group.id);
			});
		},
	},
	watch: {
		internalConfig(to) {
			to.forEach((group) => {
				group.filter.forEach((input) => {
					if (!Object.prototype.hasOwnProperty.call(this.values, input.id)) {
						this.$set(this.values, input.id, undefined);
						this.$set(this.tmpValues, input.id, undefined);
					}
				});
			});
			this.init();
		},
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.updateFromQuery();
			this.generateQuery();
		},
		getSlotName(index) {
			return `input-${index + 1}`;
		},
		openFilter(groupId) {
			this.tmpValues = klona(this.values);
			this.openGroupId = groupId;
		},
		handleRemove(groupId) {
			// reset values
			const removedGroup = this.internalConfig.find(
				(group) => group.id === groupId
			);
			removedGroup.filter.forEach((input) => {
				this.tmpValues[input.id] = undefined;
				this.values[input.id] = undefined;
			});
			// update query
			this.generateQuery();
			this.openGroupId = undefined;
		},
		handleApply() {
			// persist new values
			this.openGroup.filter.forEach((input) => {
				this.$set(this.values, input.id, this.tmpValues[input.id]);
			});
			this.handleCancel();
			this.generateQuery();
		},
		handleCancel() {
			this.openGroupId = undefined;
		},
		clearQuery() {
			Object.entries(this.values).forEach(([key]) => {
				this.$set(this.values, key, undefined);
			});
		},
		generateQuery() {
			const query = this.parser.generator(this.internalConfig, this.values);
			this.$emit("newQuery", query);
		},
		updateFromQuery() {
			const parsedValues = this.parser.parser(this.internalConfig, this.query);
			this.$set(this, "values", parsedValues);
		},
	},
};
</script>

<style lang="scss" scoped>
.filter {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.add-filter {
	vertical-align: middle;
	margin-bottom: 8px;
}
.md-chip {
	margin-bottom: 8px;
}
.row {
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	align-items: center;
	.chips {
		margin-right: 0.5rem;
	}
}
</style>
