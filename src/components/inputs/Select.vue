<template>
  <select v-model="vmodelProxy">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: undefined
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

<style lang="scss" scoped>
.select {
  display: block;
}
</style>
