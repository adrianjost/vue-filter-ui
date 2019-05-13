<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{config.title}}</md-dialog-title>

    <div id="limit-picker" class="md-menu-content-container md-scrollbar md-theme-default">
      <md-radio v-for="option in config.options" :key="option"
                v-model="selection"
                :value="option"
                class="md-primary">
        {{option}}
      </md-radio>
    </div>

    <md-dialog-actions>
      <md-button @click="onCancle">{{$parent.cancleLabel}}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{$parent.applyLabel}}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import Vue from 'vue'
import { MdDialog, MdButton, MdRadio } from 'vue-material/dist/components'
Vue.use(MdDialog)
Vue.use(MdButton)
Vue.use(MdRadio)

  export default {
    name: 'LimitPicker',
    props: ['identifier', 'active', 'config'],
    data() {
      return {
        isActive: false,
        selection: 0,
        apiQuery: {},
        urlQuery: {},
      };
    },
    watch: {
      active(to) {
        this.isActive = to;
      },
      isActive(to) {
        if (to == false) {
          this.onCancle();
        }
      },
    },
    created() {
      this.$parent.$on('reset', this.resetSelection);
      this.$parent.$on('newUrlQuery', this.updateFromUrl);
    },
    methods: {
      onConfirm() {
        let displayString;
        if (this.selection) {
          this.apiQuery['$limit'] = this.selection;
          this.urlQuery['$limit'] = this.selection;
          displayString = this.config.displayTemplate.replace(/%1/g, this.selection);
          this.$emit('set', this.identifier, {
              apiQuery: this.apiQuery,
              urlQuery: this.urlQuery,
              displayString
          });
        }
      },
      onCancle() {
        this.$emit('cancle');
      },
      resetSelection(key) {
        if (key == this.identifier || !key) {
          this.selection = this.config.defaultSelection || 0;
        }
      },
      updateFromUrl(urlQuery){
        if(urlQuery['$limit']){
          this.selection = urlQuery['$limit'];
        }

        this.onConfirm();
      }
    },
  };
</script>

<style lang="scss" scoped>
  #limit-picker{
    max-height: 200px;
    max-height: 40vh;
    padding: 16px;
    .md-checkbox, .md-radio{
      display: flex;
    }
  }
</style>
