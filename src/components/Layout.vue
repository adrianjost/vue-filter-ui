<template>
	<div class="filter">
		<div class="row">
			<div class="chips">
				<slot name="chips" />
			</div>
			<div>
				<slot name="select" />
			</div>
		</div>

		<slot name="modal" />
	</div>
</template>

<style lang="scss" scoped>
.row {
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	align-items: center;
	.chips {
		margin-right: 0.5rem;
	}
}
</style>
