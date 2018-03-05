<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{config.title}}</md-dialog-title>

    <div id="selection-picker">
      <md-field>
        <label for="options">{{config.title}}</label>
        <md-select v-model="selections" id="options" :multiple="config.multiple">
          <md-option v-for="option in config.options"
                     :key="option[0]"
                     :value="JSON.stringify(option)">
            {{option[1]}}
          </md-option>
        </md-select>
      </md-field>
    </div>

    <md-dialog-actions>
      <md-button @click="onCancle">{{$parent.cancleLabel}}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{$parent.applyLabel}}</md-button>
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
        selections: (this.config.multiple)?[]:'',
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
        if (this.selections) {
          // this.apiQuery["providerName[$in]"] = this.selections; // corret but api seems broken
          if(this.config.multiple){
            const selections = this.selections.map(selection => {return JSON.parse(selection)});

            const selectedValues = selections.map(s => {return s[0];});
            const selectedLabels = selections.map(s => {return s[1];});
            this.apiQuery[this.config.property + '[$in]'] = selectedValues
            this.urlQuery[this.config.property] = selectedLabels.reduce((prev, curr) => prev +','+ curr );
            // TODO ~ show only label not values.
            displayString = this.config.displayTemplate.replace(/%1/g, selectedLabels.reduce((prev, curr) => prev +', '+ curr ));
          }else{
            const selections = JSON.parse(this.selections);

            this.apiQuery[this.config.property] = selections[0];
            this.urlQuery[this.config.property] = selections[0];
            displayString = this.config.displayTemplate.replace(/%1/g, selections[1]);
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
          this.selections = '';
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
