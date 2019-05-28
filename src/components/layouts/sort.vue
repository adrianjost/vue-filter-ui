<template>
  <div class="parallel">
    <slot
      name="input-1"
      class="slot-1"
    />
    <slot
      name="input-2"
      class="slot-2"
    />
  </div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	.parallel{
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		.slot-1{
			flex: 1;
		}
	}
</style>
