<template>
  <CustomSelect v-model="vmodelProxy" :options="options" multiple />
</template>
<script>
import CustomSelect from "./Select";
export default {
  components: {
    CustomSelect
  },
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => [
        { value: false, label: "✖" },
        { value: undefined, label: "◯" },
        { value: true, label: "✔" }
      ],
      validator: options => {
        return options.every((option, index) => {
          if (!option.hasOwnProperty("label")) {
            throw new Error(`option ${index} is missing a label`);
          }
          if (!option.hasOwnProperty("value")) {
            throw new Error(`option ${index} is missing a value`);
          }
          return (
            option.hasOwnProperty("label") && option.hasOwnProperty("value")
          );
        });
      }
    }
  },
  computed: {
    vmodelProxy: {
      get() {
        return this.value;
      },
      set(to) {
        this.$emit("input", to);
      }
    }
  }
};
</script>
