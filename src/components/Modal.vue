<template>
	<div class="custom-modal-wrapper" @click.self="handleCancel">
		<div class="custom-modal">
			<h2 class="title">{{ title }}</h2>
			<div class="body">
				<slot />
			</div>
			<div class="footer">
				<button class="btn btn--secondary remove" @click="handleRemove">
					{{ labelRemove }}
				</button>
				<div style="flex: 1" />
				<button class="btn btn--secondary cancel" @click="handleCancel">
					{{ labelCancel }}
				</button>
				<button class="btn btn--primary apply" @click="handleApply">
					{{ labelApply }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		labelApply: {
			type: String,
			default: "Apply",
		},
		labelCancel: {
			type: String,
			default: "Cancel",
		},
		labelRemove: {
			type: String,
			default: "Remove",
		},
	},
	methods: {
		handleApply() {
			this.$emit("apply");
		},
		handleCancel() {
			this.$emit("cancel");
		},
		handleRemove() {
			this.$emit("remove");
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-modal-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.2);
}
.custom-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 999;
	min-width: 60ch;
	max-width: 600px;
	padding: 24px;
	background: #fff;
	border-radius: 2px;
	-webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
		0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
.title {
	margin: 0.5em 0 1em;
	font-size: 2em;
	line-height: 1.1em;
	padding-bottom: 0.3rem;
	border-bottom: 1px solid #eaecef;
}
.body {
	margin: 1rem 0 2rem;
}
.footer {
	display: flex;
	justify-content: flex-end;
	.btn {
		padding: 0.5em 1em;
		margin: 0 0.25rem;
		font-family: inherit;
		font-size: 1rem;

		text-transform: uppercase;
		background: transparent;
		border: none;
		border-radius: 2px;
		-webkit-transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		&:first-of-type {
			margin-left: 0;
		}
		&:last-of-type {
			margin-right: 0;
		}
		&:hover,
		&:focus {
			background-color: rgba(0, 0, 0, 0.15);
		}
		&.btn--primary {
			background-color: #1b6de7;
			color: #fff;
			&:hover,
			&:focus {
				background-color: darken(#1b6de7, 15%);
			}
		}
	}
}
</style>
