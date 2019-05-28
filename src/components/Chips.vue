<template>
  <div>
    <md-chip
      v-for="chip in chips"
      :key="chip.id"
      md-clickable
      md-deletable
      @click="$emit('open', chip.id)"
      @md-delete.stop="$emit('remove', chip.id)"
    >
      {{ chip.label }}
    </md-chip>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdChips } from 'vue-material/dist/components'
Vue.use(MdChips)

export default {
	props:{
		chips: {
			type: Array,
			required: true,
		}
	},
}
</script>

<style lang="scss" scoped>

</style>
