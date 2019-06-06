<template>
	<div class="tri-state-toggle">
		<span v-if="label" class="label">{{ label }}</span>
		<span>
			<input
				v-for="option in options"
				:key="option.label"
				v-model="vmodelProxy"
				type="radio"
				:name="JSON.stringify(options)"
				:value="option.value"
				:aria-label="option.label"
			/>
		</span>
	</div>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		value: {
			type: Boolean,
			default: undefined,
		},
		label: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: () => [
				{ value: false, label: "false" },
				{ value: undefined, label: "undefined" },
				{ value: true, label: "true" },
			],
			validator: (options) => {
				if (!options.length === 3) {
					throw new Error("you must specify 3 options");
				}
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
.tri-state-toggle {
	* {
		box-sizing: border-box;
	}
	border: 0;
	padding: 0;
	white-space: nowrap;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: nowrap;
	.label {
		flex: 1;
	}
	input {
		display: inline-block;
		height: 32px;
		width: 32px;
		visibility: hidden;
		margin: 0;
		padding: 0;
		&:before {
			visibility: visible;
			display: block;
			box-sizing: border-box;
			height: 32px;
			width: 32px;
			padding: 8px 0;
			font-size: 16px;
			line-height: 16px;
			text-align: center;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.3);
			transition: background-color 0.3s ease-in-out;
		}
		&:nth-of-type(1):before {
			content: "✖";
			border-radius: 50% 0 0 50%;
		}
		&:nth-of-type(2):before {
			content: "◯";
		}
		&:nth-of-type(3):before {
			content: "✔";
			border-radius: 0 50% 50% 0;
		}
		&:nth-of-type(1):checked:before {
			background-color: #b10438;
			border-radius: 50% 0 0 50%;
		}
		&:nth-of-type(2):checked:before {
			background-color: grey;
		}
		&:nth-of-type(3):checked:before {
			background-color: #2e7d32;
			border-radius: 0 50% 50% 0;
		}
	}
}
</style>
