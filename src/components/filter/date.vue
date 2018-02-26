<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>{{this.config.title}}</md-dialog-title>

    <div id="provider-picker">
      <md-datepicker v-model="DateRange.from" :md-disabled-dates="disabledFromDates">
        <label>{{$lang.filter.createdAt.from}}</label>
      </md-datepicker>

      <md-datepicker v-model="DateRange.to" :md-disabled-dates="disabledToDates">
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
        let displayString;
        let fromString;
        let toString;
        console.log(this.DateRange);
        if (this.DateRange.from || this.DateRange.to) {
          if (this.DateRange.from) {
            const from = new Date(this.DateRange.from);
            this.apiQuery[this.config.property + '[$gte]'] = this.DateRange.from; // startDate
            this.urlQuery.AtFrom = this.DateRange.from;
            fromString = `${from.getDate()}.${from.getMonth() + 1}.${from.getFullYear()}`;
          } else {
            delete this.apiQuery[this.config.property + '[$gte]'];
            delete this.urlQuery.AtFrom;
            fromString = '∞';
          }
          if (this.DateRange.to) {
            const to = new Date(this.DateRange.to);
            this.apiQuery[this.config.property + '[$lte]'] = this.DateRange.to; // endDate
            this.urlQuery.AtTo = this.DateRange.to;
            toString = `${to.getDate()}.${to.getMonth() + 1}.${to.getFullYear()}`;
          } else {
            delete this.apiQuery[this.config.property + '[$gte]'];
            delete this.urlQuery.AtTo;
            toString = '∞';
          }

          displayString = this.config.displayTemplate.replace("%1", fromString).replace("%2", toString);
        } else {
          this.apiQuery = {};
          displayString = null,
            this.urlQuery = {};
        }
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
      disabledFromDates: (date) => {
        const today = new Date();
        return (today < date);

        // not working
        const earlier = !((this.DateRange || {}).to && (this.DateRange.to) > date);
        return (earlier && (today < date));
      },
      disabledToDates: (date) => {
        const today = new Date();
        return (today < date);

        // not working
        const later = !((this.DateRange || {}).from && (this.DateRange.from > date));
        return (later && (today < date));
      },
      orderDated() {
        const a = this.DateRange.from;
        const b = this.DateRange.to;
        if (a && b) {
          this.DateRange.from = Math.min(a, b);
          this.DateRange.to = Math.max(a, b);
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
  #provider-picker {
    padding: 16px;
  }
</style>
