<template>
  <fieldset class="tri-state-toggle">
    TriStateToggle:
    <input
      v-for="option in options"
      :key="option.label"
      v-model="vmodelProxy"
      type="radio"
      :value="option.value"
      :aria-label="option.label"
    />
  </fieldset>
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
        { value: false, label: "false" },
        { value: undefined, label: "undefined" },
        { value: true, label: "true" }
      ],
      validator: options => {
        if (!options.length === 3) {
          throw new Error("you must specify 3 options");
        }
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

<style lang="scss" scoped>
.tri-state-toggle {
  * {
    box-sizing: border-box;
  }
  border: 0;
  font-size: 0;
  line-height: 0;
  white-space: nowrap;
  margin: 0 auto;
  display: block;
  width: 96px;
  input {
    display: inline-block;
    height: 32px;
    width: 32px;
    visibility: hidden;
    margin: 0;
    padding: 0;
    &:before {
      visibility: visible;
      display: block;
      box-sizing: border-box;
      height: 32px;
      width: 32px;
      padding: 8px 0;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease-in-out;
    }
    &:nth-of-type(1):before {
      content: "✖";
      border-radius: 50% 0 0 50%;
    }
    &:nth-of-type(2):before {
      content: "◯";
    }
    &:nth-of-type(3):before {
      content: "✔";
      border-radius: 0 50% 50% 0;
    }
    &:nth-of-type(1):checked:before {
      background-color: #b10438;
      border-radius: 50% 0 0 50%;
    }
    &:nth-of-type(2):checked:before {
      background-color: grey;
    }
    &:nth-of-type(3):checked:before {
      background-color: #2e7d32;
      border-radius: 0 50% 50% 0;
    }
  }
}
</style>
