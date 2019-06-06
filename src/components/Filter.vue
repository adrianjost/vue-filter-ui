<template>
	<div class="filter">
		<div class="row">
			<component
				:is="componentChips"
				v-if="chips.length > 0"
				class="chips"
				:chips="chips"
				@open="openFilter"
				@remove="handleRemove"
			/>

			<component
				:is="componentSelect"
				class="filter-select"
				:label-add="labelAdd"
				:options="unusedFilters"
				@openFilter="openFilter"
			/>
		</div>

		<component
			:is="componentModal"
			v-if="openGroup"
			:title="openGroup.title"
			:label-apply="labelApply"
			:label-cancle="labelCancle"
			:label-remove="labelRemove"
			@apply="handleApply"
			@cancle="handleCancle"
			@remove="handleRemove(openGroup.id)"
		>
			<component :is="openGroup.layout" class="layout">
				<!-- eslint-disable vue/no-unused-vars -->
				<!-- index usage is not detected -->
				<template
					v-for="(input, index) in openGroup.filter"
					v-slot:[getSlotName(index)]
				>
					<!-- eslint-enable vue/no-unused-vars -->
					<component
						:is="input.input"
						:key="input.label"
						v-model="tmpValues[input.id]"
						:options="input.options"
						:label="input.label"
					/>
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

export default {
	props: {
		labelAdd: { type: String, default: "add filter" },
		labelApply: { type: String, default: "apply" },
		labelCancle: { type: String, default: "cancle" },
		labelRemove: { type: String, default: "remove" },
		/*
    "handleUrl": { type: Boolean },
    "saveState": { type: Boolean },
		"consistentOrder": {type: Boolean, default: true},
		*/
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
				return ["generateQuery", "parseQuery"].every(
					(attr) => typeof parser[attr] === "function"
				);
			},
		},
	},
	data() {
		return {
			activeGroups: [],
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
					if (!this.values.hasOwnProperty(input.id)) {
						this.$set(this.values, input.id, undefined);
						this.$set(this.tmpValues, input.id, undefined);
					}
				});
			});
		},
	},
	methods: {
		getSlotName(index) {
			return `input-${index + 1}`;
		},
		openFilter(groupId) {
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
			// remove from active list
			const newActiveGroupList = this.activeGroups.filter((a) => a !== groupId);
			this.$set(this, "activeGroups", newActiveGroupList);
			// update query
			this.generateQuery();
			this.openGroupId = undefined;
		},
		handleApply() {
			// add filter to list
			const hasValues = this.openGroup.filter.some(
				(input) => this.tmpValues[input.id] !== undefined
			);
			if (hasValues && !this.activeGroups.includes(this.openGroup.id)) {
				this.activeGroups.push(this.openGroup.id);
			} else if (!hasValues) {
				const index = this.activeGroups.findIndex(
					(e) => e === this.openGroup.id
				);
				this.activeGroups.splice(index, 1);
			}
			// persist new values
			this.openGroup.filter.forEach((input) => {
				this.$set(this.values, input.id, this.tmpValues[input.id]);
			});

			this.handleCancle();
			this.generateQuery();
			this.$forceUpdate();
		},
		handleCancle() {
			this.openGroupId = undefined;
		},
		generateQuery() {
			const query = this.parser.generateQuery(this.internalConfig, this.values);
			this.$emit("newQuery", query);
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
