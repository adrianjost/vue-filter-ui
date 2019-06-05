<template>
  <div>
    <button
      v-for="option in options"
      :key="option.id"
      @click="$emit('openFilter', option.id)"
    >
      {{ option.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
