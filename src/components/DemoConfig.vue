<template>
  <section>
    <div class="config">
      <label>
        <b>addLabel:</b>
        <input v-model="config.addLabel" type="text" />
      </label>
      <label>
        <b>applyLabel:</b>
        <input v-model="config.applyLabel" type="text" />
      </label>
      <label>
        <b>cancleLabel:</b>
        <input v-model="config.cancleLabel" type="text" />
      </label>
      <!--
      <label>
        <b>handleUrl:</b>
        <input v-model="config.handleUrl" type="checkbox" />
      </label>
      <label>
        <b>saveState:</b>
        <input v-model="config.saveState" type="checkbox" />
      </label>
      <label>
        <b>consistentOrder:</b>
        <input v-model="config.consistentOrder" type="checkbox" />
      </label>
      -->
      <label style="width: 100%">
        <b>filter:</b>
        <textarea v-model="filters" />
      </label>
    </div>
    <p v-if="configError" style="color: red"><b>Error:</b> {{ configError }}</p>
  </section>
</template>

<script>

const defaultFilter = `[
  {
    title: "Sort",
    chipTemplate: ${"([v1, v2]) => `v1: ${v1} v2: ${v2}`"},
    layout: "sort",
    required: false,
    filter: [
      {
        // Query data
        attribute: "$sort-attribute",
        //applyNegated: false,
        //operator: "=",

        // UI options
        options: undefined,
        input: "TriSwitch"
      },
      {
        // Query data
        attribute: "$sort-order",
        //applyNegated: false,
        //operator: "=",

        // UI options
        options: undefined,
        input: "Toggle"
      }
    ]
  },
  {
    title: "Veröffentlicht?",
    chipTemplate: ([v1]) => ${'`${v1 ? "is published" : "is unpublished"}`'},
    required: false,
    filter: [
      {
        // Query data
        attribute: "isPublished",
        applyNegated: false,
        operator: "=",

        // UI options
        options: undefined,
        input: "TriSwitch"
      }
    ]
  },
  {
    title: "Lists",
    chipTemplate: ([v1, v2]) =>
      ${'`${v1 ? "is temp" : "is persistent"} ${v2 ? "isCool" : "isHot"}`'},
    required: false,
    filter: [
      {
        // Query data
        attribute: "isTemp",
        applyNegated: true,
        operator: "=",

        // UI options
        options: [
          {
            label: "No",
            value: true
          },
          {
            label: "~",
            value: undefined
          },
          {
            label: "Yes",
            value: false
          }
        ],
        input: "Radio"
      },
      {
        // Query data
        attribute: "isCool",
        operator: "=",

        // UI options
        options: [
          {
            label: "Check",
            value: "YES"
          },
          {
            label: "Yes",
            value: "YES YES"
          },
          {
            label: "NO",
            value: "nope :("
          }
        ],
        input: "Checkbox"
      }
    ]
  },
  {
    title: "Select",
    chipTemplate: "1: %1; 2: %2",
    filter: [
      {
        // Query data
        attribute: "isDaddy",
        operator: "=",

        // UI options
        options: [
          {
            label: "Daddy",
            value: true
          },
          {
            label: "no daddy",
            value: false
          }
        ],
        input: "Select"
      },
      {
        // Query data
        attribute: "isMultiDaddy",
        operator: "=",

        // UI options
        options: [
          {
            label: "Daddy",
            value: true
          },
          {
            label: "no daddy",
            value: false
          }
        ],
        input: "MultiSelect"
      }
    ]
  }
]
`;

export default {
  model: {
    prop: "config",
    event: "input"
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      filters: "",
      configError: undefined
    };
  },
  watch: {
    filters(to) {
      try {
        const parsed = eval(to);
        this.$set(this.config, "filter", parsed);
        localStorage.setItem("filterConfig", to);
        this.configError = "";
      } catch (error) {
        this.configError = error;
      }
    },
  },
  created(){
    const storage = localStorage.getItem("filterConfig");
    this.filters = storage ? storage : defaultFilter;
  },
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
    border-color: #ccc;
    resize: vertical;
  }
}
</style>
