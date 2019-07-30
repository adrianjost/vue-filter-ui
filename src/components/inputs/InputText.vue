<template>
	<label class="label">
		{{ label }}
		<input v-model="vmodelProxy" type="text" />
	</label>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
	},
	computed: {
		vmodelProxy: {
			get() {
				return this.value;
			},
			set(to) {
				this.$emit("input", to);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.checkbox-list {
	border: 0;
	display: block;
	.label,
	input {
		display: block;
		width: 100%;
	}
}
</style>
