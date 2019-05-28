<template>
  <div
    v-if="active"
    class="custom-modal-wrapper"
    @click.self="handleCancle"
  >
    <div class="custom-modal">
      <h2>{{ title }}</h2>
      <slot />
      <button @click="handleCancle">
        {{ labelCancle }}
      </button>
      <button @click="handleApply">
        {{ labelApply }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean
		},
		title: {
			type: String,
			required: true
		},
		labelApply: {
			type: String,
			default: "Apply"
		},
		labelCancle: {
			type: String,
			default: "Cancle"
		},
	},
	methods: {
		handleApply(){
			this.$emit("apply")
		},
		handleCancle(){
			this.$emit("cancle")
		},
	}
}
</script>

<style lang="scss" scoped>
.custom-modal-wrapper{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.2);
}
.custom-modal{
	position: fixed;
	top: 50%;
	left: 50%;
	min-width: 300px;
	transform: translate(-50%, -50%);
	background: white;
	padding: 2rem;
	border: 5px solid green;
	box-shadow: 0 0 100px rgba(0,0,0,.5);
}
button{
	margin: 1rem .5rem;
}
</style>
