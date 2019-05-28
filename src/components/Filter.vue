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

    <button @click="openFilter(internalConfig[0])">
      Toggle
    </button>
    <component
      :is="componentChips"
      :chips="chips"
    />

    <component
      :is="componentModal"
      v-if="openedFilter"
      :title="openedFilter.title"
      :label-apply="labelApply"
      :label-cancle="labelCancle"
      :active.sync="active"
      @apply="handleApply"
      @cancle="handleCancle"
    >
      <component
        :is="openedFilter.design"
        v-if="openedFilter"
        class="layout"
      >
        <!-- eslint-disable vue/no-unused-vars -->
        <!-- index usage is not detected -->
        <template
          v-for="(input, index) in openedFilter.filter"
          v-slot:[getSlotName(index)]
        >
          <!-- eslint-enable vue/no-unused-vars -->
          <component
            :is="input.design"
            :key="input.label"
            v-model="input.value"
            :options="input.options"
          />
        </template>
      </component>
    </component>
  </div>
</template>

<script>
import Vue from 'vue'

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
		}
  },
  data() {
    return {
			appliedFilterTitles: [],
			openedFilterTitle: undefined,
		};
	},
	computed: {
		active:{
			get(){
				return !!this.openedFilterTitle;
			},
			set(to){
				if(!to){
					this.openedFilterTitle = undefined;
				}
			}
		},
		openedFilter(){
			return this.openedFilterTitle ? this.internalConfig.find(filter => filter.title === this.openedFilterTitle) : undefined
		},
		internalConfig(){
			return this.filter.map((orgFilter) => {
				const filter = {...orgFilter};
				if(Array.isArray(filter.filter)){
					if(!filter.design){
						filter.design = "default";
					}
					if(typeof filter.design === "string"){
						const name = filter.design;
						filter.design = () => import(`@/components/layouts/${name}.vue`);
					}
					filter.filter = filter.filter.map((orgSubFilter) => {
						const subFilter = {...orgSubFilter};
						if(typeof subFilter.design === "string"){
							const name = subFilter.design;
							subFilter.design = () => import(`./inputs/${name}.vue`)
						}
						return subFilter;
					})
					return filter;
				}else{
					if(typeof filter.design === "string"){
						const type = Array.isArray(filter.filter) ? "layout" : "input";
						const name = filter.design; // we need to copy it into a variable to prevent a recursive definition of filter.design
						filter.design = () => import(`@/components/${type}s/${name}.vue`)
					}
					return {
						title: filter.title,
						chipTemplate: filter.chipTemplate,
						design: () => import(`@/components/layouts/default.vue`),
						filter: [filter],
					}
				}
			})
		},
		chips(){
			return this.internalConfig.filter((filter) => this.appliedFilterTitles.includes(filter.title)).map((filter) => {
				const values = filter.filter.map(a => a.value);
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
					id: filter.title,
					label: label(values),
				}
			})
		}
	},
	methods: {
		getSlotName(index){
 			return `input-${index + 1}`
		},
		openFilter(filterConfig){
			this.openedFilterTitle = filterConfig.title;
		},
		handleRemove(){

		},
		handleApply(){
			const filterTitle = this.openedFilter.title
			if(!this.appliedFilterTitles.includes(filterTitle)){
				this.appliedFilterTitles.push(filterTitle)
			}
			this.handleCancle();
		},
		handleCancle(){
			this.openedFilterTitle = undefined;
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
