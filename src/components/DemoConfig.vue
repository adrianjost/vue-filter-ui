<template>
  <section>
    <div class="config">
      <label>
        <b>addLabel:</b>
        <input
          v-model="config.addLabel"
          type="text"
        >
      </label>
      <label>
        <b>applyLabel:</b>
        <input
          v-model="config.applyLabel"
          type="text"
        >
      </label>
      <label>
        <b>cancleLabel:</b>
        <input
          v-model="config.cancleLabel"
          type="text"
        >
      </label>
      <label>
        <b>handleUrl:</b>
        <input
          v-model="config.handleUrl"
          type="checkbox"
        >
      </label>
      <label>
        <b>saveState:</b>
        <input
          v-model="config.saveState"
          type="checkbox"
        >
      </label>
      <label>
        <b>consistentOrder:</b>
        <input
          v-model="config.consistentOrder"
          type="checkbox"
        >
      </label>
      <label style="width: 100%">
        <b>filter:</b>
        <textarea v-model.lazy="filterString" />
      </label>
    </div>
    <p
      v-if="configError"
      style="color: red"
    >
      <b>Error:</b> {{ configError }}
    </p>
  </section>
</template>

<script>
export default {
  model: {
		prop: "config",
		event: "input",
  },
  props: {
    config: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      configError: undefined
    };
	},
  computed: {
    filterString: {
      get() {
        return JSON.stringify(this.config.filter, null, 2);
      },
      set(to) {
        try {
          this.config.filter = JSON.parse(to);
        } catch (error) {
          this.configError = error;
        }
      }
    }
  },
	watch: {
		config: {
			handler(val){
				try {
					localStorage.setItem("config", JSON.stringify(this.config));
        } catch (error) {
          this.configError = error;
        }
			},
			deep: true,
		}
	}
};
</script>

<style lang="scss" scoped>
.config {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 100%;
  label {
    padding: 0.5em;
    min-width: 300px;
    display: inline-block;
  }
  textarea {
    width: 100%;
    flex: 1;
    min-height: 15rem;
    background: url(http://i.imgur.com/2cOaJ.png);
    background-attachment: local;
    background-repeat: no-repeat;
    padding-left: 35px;
    padding-top: 10px;
    border-color: #ccc;
    resize: vertical;
  }
}
</style>
