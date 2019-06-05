<template>
  <div class="wrapper">
    <search-filter
      ref="filtercomponent"
      :label-add="config.addLabel"
      :label-apply="config.applyLabel"
      :label-cancle="config.cancleLabel"
      :handle-url="config.handleUrl"
      :save-state="config.saveState"
      :consistent-order="config.consistentOrder"
      :filter="config.filter"
      :parser="parser"
      @newQuery="updateQuery"
    />
    <hr />
    <DemoConfig v-model="config" />
    <hr />
    <table width="100%">
      <tr>
        <th>FeathersJS</th>
        <th>URLQuery</th>
      </tr>
      <tr>
        <td>
          <pre>{{ JSON.stringify(apiQuery, null, 2) }}</pre>
        </td>
        <td>
          <pre>{{ JSON.stringify(urlQuery, null, 2) }}</pre>
        </td>
      </tr>
    </table>

    <div class="events">
      <b>Native Events</b>
      <p v-for="event in nativeEvents" :key="event.timeStamp" class="event">
        ({{ parseInt(event.timeStamp) }}) <b>{{ event.type }}:</b>
        <code>
          {{ JSON.stringify(event.detail, null, 2) }}
        </code>
      </p>
    </div>
  </div>
</template>

<script>
import DemoConfig from "./DemoConfig.vue";
import Filter from "./Filter.vue";

import parser from "../parser/FeathersJS";

const defaultFilter = [
  {
    title: "Sort",
    chipTemplate: (v1, v2) => `v1: ${v1} v2: ${v2}`,
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
    chipTemplate: v1 => `${v1 ? "is published" : "is unpublished"}`,
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
    title: "Unveröffentlicht?",
    chipTemplate: v1 => `${v1 ? "is temp" : "is persistent"}`,
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
      },
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
      }
    ]
  },
  {
    title: "Select",
    chipTemplate: `1: %1; 2: %2`,
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
];
export default {
  components: {
    DemoConfig,
    "search-filter": Filter
  },
  data() {
    return {
      parser,
      toggle: false,
      apiQuery: {},
      urlQuery: {},
      nativeEvents: [],
      config:
        localStorage.getItem("config") && false
          ? JSON.parse(localStorage.getItem("config"))
          : {
              addLabel: undefined,
              filter: defaultFilter,
              applyLabel: undefined,
              cancleLabel: undefined,
              handleUrl: true,
              saveState: false,
              consistentOrder: true
            }
    };
  },
  mounted() {
    // test native event handling
    const events = ["newFilter", "newUrlQuery", "reset"];
    window.addEventListener("load", () => {
      const filter = this.$refs["filtercomponent"].$el;
      events.forEach(event => {
        filter.addEventListener(event, e => {
          this.nativeEvents.unshift(e);
        });
      });
    });
  },
  methods: {
    updateQuery(query) {
      this.apiQuery = query;
    }
  }
};
</script>

<!-- CUSTOM MODAL -->
<style lang="scss" scoped>
.custom-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.custom-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border: 5px solid green;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
}
</style>

<!-- DEMO STYLES -->
<style lang="scss" scoped>
pre {
  background: #eee;
}
.wrapper {
  margin: 25px;
  padding: 25px;
  border: 1px dashed lightgrey;
  border-radius: 5px;
}
hr {
  border: none;
  background: transparent;
  border-bottom: 1px dashed lightgrey;
  margin: 1rem 0;
}
table {
  display: table;
  margin-top: 25px;
  width: 100%;
  text-align: left;
  word-break: break-all;
  word-break: break-word;
}
.pre {
  overflow: auto;
}
.events {
  max-height: 350px;
  overflow-y: auto;
  .event {
    margin: 0;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.05);
    &:nth-of-type(2n) {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
