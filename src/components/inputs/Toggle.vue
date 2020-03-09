<template>
	<label>
		<span v-if="label" class="label">{{ label }}</span>
		<button @click="nextState" type="button" tab-index="0" class="toggle">
			<span class="toggle-text">{{ options[currentIndex].label }}</span>
		</button>
	</label>
</template>

<script>
import { inputDataTypes } from "./helper";

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
			type: inputDataTypes,
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
	data() {
		return {
			currentIndex: 0,
		};
	},
	watch: {
		value() {
			this.loadIndex();
		},
	},
	created() {
		this.loadIndex();
	},
	methods: {
		loadIndex() {
			let newIndex = this.options.findIndex(
				(option) => option.value === this.value
			);
			if (newIndex === -1) {
				if (this.value === undefined) {
					newIndex = 0;
				} else {
					throw new Error("Can't find value in options", this.value);
				}
			}
			this.currentIndex = newIndex;
		},
		nextState() {
			this.currentIndex = (this.currentIndex + 1) % this.options.length;
			this.$emit("input", this.options[this.currentIndex].value);
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle {
	border: 1px solid grey;
	background: transparent;
	font-weight: bold;
	border-radius: 50vmax;
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	min-width: 2rem;
	min-height: 2rem;
	justify-content: center;
	align-items: center;
	padding: 0.25em;
}
.label {
	display: block;
}
</style>
