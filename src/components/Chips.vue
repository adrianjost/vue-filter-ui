<template>
  <div>
    {{ chips.map(a => a.label).join("; ") }}
  </div>
</template>

<script>
	export default {
props:{
	chips: {
		type: Array,
		required: true,
	}
}
	}
</script>

<style lang="scss" scoped>

</style>
