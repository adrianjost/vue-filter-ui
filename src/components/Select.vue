<template>
  <CustomDropdown :visible="visible" @clickout="visible = false">
    <div class="toggle" @click="visible = true">{{labelAdd}}</div>
    <ol slot="dropdown" class="dialog">
      <li v-for="option in options"
          :key="option.id">
        <button class="option"
          @click="handleClick(option.id)"
        >
          {{ option.title }}
        </button>
      </li>
    </ol>
  </CustomDropdown>
</template>

<script>
import CustomDropdown from 'vue-my-dropdown';

export default {
  components: {CustomDropdown},
  props: {
    labelAdd: {
      type: String,
      default: "Add +"
    },
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      visible: false
    }
  },
  methods: {
    handleClick(id){
      this.visible = false;
      this.$emit('openFilter', id)
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle{
  padding: .5rem 1rem;
  border: 1px solid grey;
  border-radius: 3rem;
}
.dialog{
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 6px 0 #aaa;
    list-style: none;
    padding: .5rem 0;
    margin: 0;
    min-width: 20ch;
    .option{
      padding: .5rem 1rem;
      background: transparent;
      border: none;
      font-size: 1rem;
      width: 100%;
      text-align: left;
      &:hover, &:focus{
        background-color: rgba(0,0,0,.15)
      }
    }
}
</style>
