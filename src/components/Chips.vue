<template>
  <div class="chips">
    <div v-for="chip in chips" 
      :key="chip.id"  
      tab-index="0"
      :class="{
        chip: true,
        'is-deletable': chip.deletable
        }"
      @click="$emit('open', chip.id)"
    >
      {{ chip.label }}
      <button v-if="chip.deletable" type="button" class="btn-delete" @click="$emit('remove', chip.id)">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
	props:{
		chips: {
			type: Array,
			required: true,
		}
	},
}
</script>

<style lang="scss" scoped>
$transition: all .15s ease-in-out;

.chips{
  display: flex;
  flex-wrap: nowrap;
}
.chip{
  font-size: .9rem;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: .25rem .75rem;
  border: 1px solid grey;
  border-radius: 3rem;
  transition: $transition;
      cursor: pointer;
      white-space: nowrap;

    &.is-deletable{
    padding-right: .5em;
  }
  &:focus,
  &:hover {
    background: rgba(0,0,0,.5);
    color: #fff;
    .btn-delete{
      background: lightgray;
    }
    svg{
      fill: rgba(0,0,0,.5);
    }
  }
  .btn-delete{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5rem;
    padding: .1rem;
    margin: 0;
    margin-left: .5em;
    background: transparent;
    transition: $transition;
    svg{
      fill: gray;
      width: 1.1em;
      height: 1.1em;
      transition: $transition;
    }
    &:hover,
    &:focus{
      background: rgba(0,0,0,.75);
      svg{
        fill: #fff;
      }
    }
  }
}
</style>
