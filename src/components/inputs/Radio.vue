<template>
	<fieldset class="radio-list">
		<label v-for="option in options" :key="option.label" class="label">
			<input
				v-model="vmodelProxy"
				type="radio"
				:name="JSON.stringify(options)"
				:value="option.value"
			/>
			{{ option.label }}
		</label>
	</fieldset>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		value: {
			type: [Boolean, String, Number, Array, Object],
			default: undefined,
		},
		options: {
			type: Array,
			default: () => [
				{ value: false, label: "✖" },
				{ value: undefined, label: "◯" },
				{ value: true, label: "✔" },
			],
			validator: (options) => {
				return options.every((option, index) => {
					if (!option.hasOwnProperty("label")) {
						throw new Error(`option ${index} is missing a label`);
					}
					return (
						option.hasOwnProperty("label") && option.hasOwnProperty("value")
					);
				});
			},
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
.radio-list {
	border: 0;
	display: block;
	.label {
		display: block;
	}
}
</style>
