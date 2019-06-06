<template>
	<div class="parallel">
		<div class="slot-1">
			<slot name="input-1" />
		</div>
		<div class="slot-2">
			<slot name="input-2" />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.parallel {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	.slot-1 {
		flex: 1;
	}
}
</style>
