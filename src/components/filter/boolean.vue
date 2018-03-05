<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{config.title}}</md-dialog-title>

    <div id="selection-picker">
      <div class="choice" v-for="(label, property) in config.options">
        {{label}}
        <div class="tri-state-toggle">
          <input type="radio" v-model="selections[property]" :value="false">
          <input type="radio" v-model="selections[property]" :value="undefined">
          <input type="radio" v-model="selections[property]" :value="true">
        </div>
      </div>
    </div>

    <md-dialog-actions>
      <md-button @click="onCancle">{{$parent.cancleLabel}}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{$parent.applyLabel}}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: 'boolean-picker',
    props: ['identifier', 'active', 'config'],
    data() {
      return {
        isActive: false,
        selections:{},
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
        this.apiQuery = {};
        this.urlQuery = {};

        let toFilter = false;
        if(this.selections) {
          for (var property in this.selections) {
            if (this.selections[property] != undefined){
              this.apiQuery[property] = this.selections[property];
              this.urlQuery[property] = this.selections[property];
              displayString = ((displayString)?(displayString + ", "):"") + `${this.config.options[property]}: ${(this.selections[property])?'✔':'✖'}`;
              toFilter = true;
            }
          }
          if(toFilter){
            this.$emit('set', this.identifier, {
              apiQuery: this.apiQuery,
              urlQuery: this.urlQuery,
              displayString
            });
          }else{
            this.$emit('cancle');
          }
        }
      },
      onCancle() {
        this.$emit('cancle');
      },
      resetSelection(key) {
        if (key == this.identifier) {
          this.selections = {};
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
  .tri-state-toggle {
    *{
      box-sizing: border-box;
    }
    display: inline-block;
    font-size: 0;
    line-height: 0;
    white-space: nowrap;
    input{
      display: inline-block;
      height: 2.3rem;
      width: 2.3rem;
      visibility: hidden;
      margin: 0;
      padding: 0;
      &:before{
        visibility: visible;
        display: block;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 1.1rem 0;
        font-size: 1rem;
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
        background-color: red;
        border-radius: 50% 0 0 50%;
      }
      &:nth-of-type(2):checked:before{
        background-color: grey;
      }
      &:nth-of-type(3):checked:before{
        background-color: green;
        border-radius: 0 50% 50% 0;
      }
    }
  }
</style>
