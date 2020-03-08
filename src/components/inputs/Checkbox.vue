<template>
	<div>
		<span v-if="label" class="label">{{ label }}</span>
		<fieldset class="checkbox-list">
			<label v-for="option in options" :key="option.label" class="label">
				<input
					v-model="vmodelProxy"
					:name="option.label + option.value"
					:value="option.value"
					type="checkbox"
				/>
				{{ option.label }}
			</label>
		</fieldset>
	</div>
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
			type: [Boolean, Array],
			default: () => [],
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
					if (!Object.prototype.hasOwnProperty.call(option, "label")) {
						throw new Error(`option ${index} is missing a label`);
					}
					return (
						Object.prototype.hasOwnProperty.call(option, "label") &&
						Object.prototype.hasOwnProperty.call(option, "value")
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
.checkbox-list {
	border: 0;
	display: block;
	.label {
		display: block;
	}
}
</style>
