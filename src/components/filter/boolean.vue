<template>
  <div class="selection-picker">
    <div
      v-for="(label, property) in config.options"
      :key="label"
      class="choice"
    >
      {{ label }}
      <div class="tri-state-toggle">
        <input
          v-model="selections[property]"
          type="radio"
          :value="false"
        >
        <input
          v-model="selections[property]"
          type="radio"
          :value="undefined"
        >
        <input
          v-model="selections[property]"
          type="radio"
          :value="true"
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdDialog, MdButton } from 'vue-material/dist/components'
Vue.use(MdDialog)
Vue.use(MdButton)

export default {
	name: 'BooleanPicker',
	  model: {
		prop: "query",
		event: "newQuery",
  },
	props: {
		config: {
			type: Object,
			required: true,
		},
		query: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			selections:{},
		};
	},
	created(){
		this.loadFromQuery()
	},
	methods: {
		loadFromQuery(){
			console.log(this.config);
			const query = {
				"publicSubmissions": false,
				"teamSubmissions[$ne]": true,
			}
			this.config.options.forEach((option) => {
				this.config.applyNegated
			})
		},
		emitNewQuery(){},
	}
};
</script>

<style lang="scss" scoped>
  .selection-picker {
    padding: 16px;
  }
  .choice{
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    line-height: 2.3rem;
    padding: .5rem 0;
    &:not(:last-of-type){
      border-bottom: 1px dashed lightgrey;
    }
  }
  .tri-state-toggle{
    *{
      box-sizing: border-box;
    }
    display: inline-block;
    font-size: 0;
    line-height: 0;
    white-space: nowrap;
    margin-left: 25px;
    input{
      display: inline-block;
      height: 32px;
      width: 32px;
      visibility: hidden;
      margin: 0;
      padding: 0;
      &:before{
        visibility: visible;
        display: block;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        padding: 8px 0;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        color: #fff;
        background-color: rgba(0,0,0,.3);
        transition: background-color .3s ease-in-out;
      }
      &:nth-of-type(1):before{
        content: '✖';
        border-radius: 50% 0 0 50%;
      }
      &:nth-of-type(2):before{
        content: '◯';
      }
      &:nth-of-type(3):before{
        content: '✔';
        border-radius: 0 50% 50% 0;
      }
      &:nth-of-type(1):checked:before{
        background-color: #B10438;
        border-radius: 50% 0 0 50%;
      }
      &:nth-of-type(2):checked:before{
        background-color: grey;
      }
      &:nth-of-type(3):checked:before{
        background-color: #2E7D32;
        border-radius: 0 50% 50% 0;
      }
    }
  }
</style>
