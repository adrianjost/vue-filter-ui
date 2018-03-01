<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{config.title}}</md-dialog-title>

    <div id="selection-picker">
      <md-field>
        <label for="options">{{config.title}}</label>
        <md-select v-model="seletions" id="options" :multiple="config.multiple">
          <md-option v-for="option in config.options"
                     :key="option[0]"
                     :value="option[0]">
            {{option[1]}}
          </md-option>
        </md-select>
      </md-field>
    </div>

    <md-dialog-actions>
      <md-button @click="onCancle">{{$lang.buttons.cancel}}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{$lang.buttons.add}}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: 'select-picker',
    props: ['identifier', 'active', 'config'],
    data() {
      return {
        isActive: false,
        seletions: (this.config.multiple)?[]:'',
        apiQuery: {},
        urlQuery: {},
      };
    },
    created() {
      this.$parent.$on('reset', this.resetSelection);
    },
    methods: {
      onConfirm() {
        let displayString;
        if (this.seletions.length != 0) {
          // this.apiQuery["providerName[$in]"] = this.seletions; // corret but api seems broken
          if(this.config.multiple){
            this.apiQuery[this.config.property + '[$in]'] = this.seletions;
            this.urlQuery[this.config.property] = this.seletions.reduce((prev, curr) => prev +','+ curr );
            // TODO ~ show only label not values.
            displayString = this.config.displayTemplate.replace(/%1/g, this.seletions.reduce((prev, curr) => prev +', '+ curr ));
          }else{
            this.apiQuery[this.config.property] = this.seletions;
            this.urlQuery[this.config.property] = this.seletions;
            displayString = this.config.displayTemplate.replace(/%1/g, this.seletions);
          }
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
        if (key == this.identifier) {
          this.seletions = '';
        }
      },
    },
    watch: {
      active(to, from) {
        this.isActive = to;
      },
      isActive(to) {
        if (to == false) {
          this.onCancle();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  #selection-picker {
    padding: 16px;
  }
</style>
