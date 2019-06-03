<template>
  <div
    class="filter"
  >
    <!--
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
      :vmodel="vmodel"
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
		-->

    <button @click="openFilter(internalConfig[0].id)">
      Toggle
    </button>
    <component
      :is="componentChips"
      :chips="chips"
      @open="openFilter"
      @remove="handleRemove"
    />

    <component
      :is="componentModal"
      v-if="openGroup"
      :title="openGroup.title"
      :label-apply="labelApply"
      :label-cancle="labelCancle"
      :active.sync="active"
      @apply="handleApply"
      @cancle="handleCancle"
    >
      <component
        :is="openGroup.design"
        v-if="openGroup"
        class="layout"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <!-- index usage is not detected -->
        <template
          v-for="(input, index) in openGroup.filter"
          v-slot:[getSlotName(index)]
        >
          <!-- eslint-enable vue/no-unused-vars -->
          <component
            :is="input.design"
            :key="input.label"
            v-model="tmpValues[input.id]"
            :options="input.options"
          />
        </template>
      </component>
    </component>
  </div>
</template>

<script>

export default {
  props: {
		"labelAdd": {type: String, default: "add filter"},
    "labelApply": {type: String, default: "apply"},
    "labelCancle": {type: String, default: "cancle"},
		/*
    "handleUrl": { type: Boolean },
    "saveState": { type: Boolean },
		"consistentOrder": {type: Boolean, default: true},
		*/
		"filter": { type: Array, required: true },
		componentChips: {
			type: Function,
			default: () => import(`@/components/Chips.vue`)
		},
		componentModal: {
			type: Function,
			default: () => import(`@/components/Modal.vue`)
		},
		parser: {
			type: Object,
			required: true,
			validator: (parser) => {
					return ["generateQuery", "parseQuery"].every(attr => typeof parser[attr] === "function")
				}
		},
  },
  data() {
    return {
			activeGroups: [],
			openGroupId: undefined,
			filterValues: {},
			values: {},
			tmpValues: {}
		};
	},
	computed: {
		active:{
			get(){
				return !!this.openGroupId;
			},
			set(to){
				if(!to){
					this.openGroupId = undefined;
				}
			}
		},
		openGroup(){
			return this.openGroupId ? this.internalConfig.find(filter => filter.id === this.openGroupId) : undefined
		},
		internalConfig(){
			return this.filter.map((orgFilter, groupIndex) => {
				const filter = {...orgFilter};

				// normalize structure
				if(!Array.isArray(filter.filter)){
					filter = {
						title: filter.title,
						chipTemplate: filter.chipTemplate,
						filter: [filter],
					}
				}
				// add identifier
				filter.id = `group-${groupIndex}`
				// resolve input wrapper component
				if(typeof filter.design !== "function"){
					const name = filter.design || "default";
					filter.design = () => import(`@/components/layouts/${name}.vue`);
				}
				// resolve input components
				filter.filter = filter.filter.map((orgSubFilter, inputIndex) => {
					const subFilter = {...orgSubFilter};
					if(typeof subFilter.design === "string"){
						const name = subFilter.design;
						subFilter.design = () => import(`./inputs/${name}.vue`);
						subFilter.id = `input-${groupIndex}-${inputIndex}`
					}
					return subFilter;
				})
				return filter;
			})
		},
		chips(){
			return this.internalConfig.filter((filter) => this.activeGroups.includes(filter.id)).map((filter) => {
				const values = filter.filter.map(a => this.values[a.id]);
				let label = typeof filter.chipTemplate === "function"
					? filter.chipTemplate
					: (values) => {
						let out = filter.chipTemplate;
						values.forEach((value, index) => {
							out.replace(`%${index}`, value)
						})
						return out
					}
				return {
					id: filter.id,
					deletable: !filter.required,
					label: label(...values),
				}
			})
		}
	},
	watch:{
		internalConfig(to){
			to.forEach(group => {
				group.filter.forEach(input => {
					if(!this.values.hasOwnProperty(input.id)){
						this.$set(this.values, input.id, false);
						this.$set(this.tmpValues, input.id, false);
					}
				})
			})
		}
	},
	methods: {
		getSlotName(index){
 			return `input-${index + 1}`
		},
		openFilter(groupId){
			this.openGroupId = groupId;
		},
		handleRemove(groupId){
			console.log("remove", groupId)
			// reset values
			const removedGroup = this.internalConfig.find((group) => group.id === groupId);
			removedGroup.filter.forEach(input => {
				this.tmpValues[input.id] = undefined;
				this.values[input.id] = undefined;
			})
			// remove from active list
			const newActiveGroupList = this.activeGroups.filter((a) => a !== groupId);
			this.$set(this, "activeGroups", newActiveGroupList );
			// update query
			this.generateQuery();
		},
		handleApply(){
			// add filter to list
			if(!this.activeGroups.includes(this.openGroup.id)){
				this.activeGroups.push(this.openGroup.id)
			}
			// persist new values
			this.openGroup.filter.forEach((input) => {
				this.$set(this.values, input.id, this.tmpValues[input.id]);
			})
			this.handleCancle();
			this.generateQuery();
			this.$forceUpdate();
		},
		handleCancle(){
			this.openGroupId = undefined;
		},
		generateQuery(){
			const query = this.parser.generateQuery(this.internalConfig, this.values);
			console.log(query);
		}
	}
};
</script>

<style lang="scss">
@import '@/styles/default.scss';
</style>
<style lang="scss" scoped>
.add-filter{
  vertical-align: middle;
  margin-bottom: 8px;
}
.md-chip{
  margin-bottom: 8px;
}
</style>
