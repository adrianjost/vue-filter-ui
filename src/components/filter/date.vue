<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{this.config.title}}</md-dialog-title>

    <div id="date-picker">
      <md-datepicker v-if="config.mode <= 2" v-model="DateRange.from" :md-disabled-dates="disabledDates">
        <label>{{$lang.filter.createdAt.from}}</label>
      </md-datepicker>

      <md-datepicker v-if="config.mode  >= 2" v-model="DateRange.to" :md-disabled-dates="disabledDates">
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
      onConfirm() {
        let fromString;
        let toString;
        if(this.config.mode <= 2 && this.DateRange.from){ // from available
          this.apiQuery[this.config.property + '[$gte]'] = this.DateRange.from; // startDate
          const from = new Date(this.DateRange.from);
          fromString = `${('0'+from.getDate()).slice(-2)}.${('0'+from.getMonth() + 1).slice(-2)}.${from.getFullYear()}`;
          this.urlQuery[this.config.property + 'From'] = fromString;
        }
        if(this.config.mode >= 2 && this.DateRange.to){ // to available
          this.apiQuery[this.config.property + '[$lte]'] = this.DateRange.to; // endDate
          const to = new Date(this.DateRange.to);
          toString = `${('0'+to.getDate()).slice(-2)}.${('0'+to.getMonth() + 1).slice(-2)}.${to.getFullYear()}`;
          this.urlQuery[this.config.property + 'To'] = toString;
        }
        if(this.config.mode == 2){
          if(!fromString){
            delete this.apiQuery[this.config.property + '[$gte]'];
            delete this.urlQuery[this.config.property + 'From'];
            fromString = '∞';
          }
          if(!toString){
            delete this.apiQuery[this.config.property + '[$gte]'];
            delete this.urlQuery[this.config.property + 'To'];
            toString = '∞';
          }
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
        const a = this.DateRange.from;
        const b = this.DateRange.to;
        if (a && b) {
          const small = Math.min(a, b)
          if(small == this.DateRange.to){
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
