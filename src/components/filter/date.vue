<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{this.config.title}}</md-dialog-title>

    <div id="date-picker">
      <md-datepicker v-if="config.mode.includes('from')" v-model="DateRange.from" :md-disabled-dates="disabledDates">
        <label>{{$lang.filter.createdAt.from}}</label>
      </md-datepicker>

      <md-datepicker v-if="config.mode.includes('to')" v-model="DateRange.to" :md-disabled-dates="disabledDates">
        <label>{{$lang.filter.createdAt.to}}</label>
      </md-datepicker>
    </div>

    <md-dialog-actions>
      <md-button @click="onCancle">{{$lang.buttons.cancel}}</md-button>
      <md-button class="md-primary" @click="onConfirm">{{$lang.buttons.add}}</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: 'date-picker',
    props: ['identifier', 'active', 'config'],
    data() {
      return {
        isActive: false,
        DateRange: {
          from: undefined,
          to: undefined,
        },
        apiQuery: {},
        urlQuery: {},
      };
    },
    created() {
      this.$parent.$on('reset', this.resetDates);
    },
    methods: {
      parseDate(date, type){
        const parsedDate = new Date(date);
        const dateString = `${('0'+parsedDate.getDate()).slice(-2)}.${('0'+(parsedDate.getMonth()+1)).slice(-2)}.${parsedDate.getFullYear()}`;
        this.apiQuery[this.config.property + ((type=='from')?'[$gte]':'[$lte]')] = date;
        this.urlQuery[this.config.property + ((type=='from')?'From':'To')] = dateString;
        return dateString;
      },
      onConfirm() {
        let fromString = '∞', toString = '∞';

        if(this.config.mode.includes('from') && this.DateRange.from){ // from available
          fromString = this.parseDate(this.DateRange.from, 'from');
        }
        if(this.config.mode.includes('to') && this.DateRange.to){ // to available
          toString = this.parseDate(this.DateRange.to, 'to');
        }
        const displayString = this.config.displayTemplate.replace(/%1/g, fromString).replace(/%2/g, toString);
        this.$emit('set', this.identifier, {
          apiQuery: this.apiQuery,
          urlQuery: this.urlQuery,
          displayString,
        });
      },
      onCancle() {
        this.$emit('cancle');
      },
      resetDates(key) {
        if (key == this.identifier) {
          this.DateRange.from = undefined;
          this.DateRange.to = undefined;
          this.apiQuery = {};
          this.urlQuery = {};
        }
      },
      disabledDates: (date) => {
        return false;

        // TODO ~ NOT WORKING AT ALL
        const config = this.a.props.config;
        let available = true;
        date = new Date(date);
        if(available && config.minDate){
          const minDate = new Date(config.minDate);
          available = (date > minDate);
        }
        if(available && config.maxDate){
          const maxDate = new Date(config.maxDate);
          available = (date < maxDate);
        }
        return !available;
      },
      orderDated() {
        if(!this.config.autoOrder){
          return;
        }
        const a = this.DateRange.from;
        const b = this.DateRange.to;
        if (a && b) {
          if(Math.min(a, b) == this.DateRange.to){
              temp = this.DateRange.to;
              this.DateRange.to = this.DateRange.from;
              this.DateRange.from = temp;
          }
        }
      },
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
      'DateRange.from': function () {
        this.orderDated();
      },
      'DateRange.to': function () {
        this.orderDated();
      },
    },
    computed: {
      firstDayOfAWeek: {
        get() {
          return 1;
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  #date-picker {
    padding: 16px;
  }
</style>
