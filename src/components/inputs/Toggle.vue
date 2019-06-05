<template>
  <button type="button" tab-index="0" class="toggle" @click="nextState">
    <span class="toggle-text">
      {{ options[currentIndex].label }}
    </span>
  </button>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: Boolean,
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
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {
    value(to) {
      this.loadIndex();
    }
  },
  created() {
    this.loadIndex();
  },
  methods: {
    loadIndex() {
      const newIndex = this.options.findIndex(
        option => option.value === this.value
      );
      if (newIndex === -1) {
        throw new Error("Can't find value in options", to);
      }
      this.currentIndex = newIndex;
    },
    nextState() {
      this.currentIndex = (this.currentIndex + 1) % this.options.length;
      this.$emit("input", this.options[this.currentIndex].value);
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  border: 1px solid grey;
  border-radius: 50vmax;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  min-width: 2rem;
  min-height: 2rem;
  justify-content: center;
  align-items: center;
  padding: 0.25em;
}
</style>
