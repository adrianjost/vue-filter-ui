<template>
	<div v-on-clickout="() => (visible = false)" class="menu">
		<div class="toggle" @click="visible = true">{{ labelAdd }}</div>
		<transition name="scale">
			<ol v-if="visible" class="dialog">
				<li v-for="option in options" :key="option.id">
					<button class="option" @click="handleClick(option.id)">
						{{ option.title }}
					</button>
				</li>
			</ol>
		</transition>
	</div>
</template>

<script>
import { directive as onClickout } from "vue-clickout";

export default {
	directives: {
		onClickout: onClickout,
	},
	props: {
		labelAdd: {
			type: String,
			default: "Add +",
		},
		options: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		handleClick(id) {
			this.visible = false;
			this.$emit("openFilter", id);
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle {
	font-size: 0.9rem;
	padding: 0.25rem 0.75rem;
	border: 1px solid grey;
	border-radius: 3rem;
	white-space: nowrap;

	&:hover,
	&:focus {
		background-color: rgba(0, 0, 0, 0.15);
	}
}
.menu {
	position: relative;
}
.dialog {
	position: absolute;
	left: 0.5rem;
	top: calc(0.5rem + 100%);
	background: #fff;
	border: 1px solid #ccc;
	box-shadow: 2px 2px 6px 0 #aaa;
	list-style: none;
	padding: 0.5rem 0;
	margin: 0;
	min-width: 20ch;
	.option {
		padding: 0.5rem 1rem;
		background: transparent;
		border: none;
		font-size: 1rem;
		width: 100%;
		text-align: left;
		&:hover,
		&:focus {
			background-color: rgba(0, 0, 0, 0.15);
		}
	}
}

.scale-enter-active,
.scale-leave-active {
	transform-origin: top left;
	transition: all 0.2s;
}
.scale-enter,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.8, 0.5);
}
</style>
