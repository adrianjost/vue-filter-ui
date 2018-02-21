<template>
  <div>
    <!--<md-field id="search-input">
        <label>{{$lang.searchContent.search_for}}</label>
        <md-input v-model="searchQuery"></md-input>
    </md-field>-->
    <div id="search-input">
      <input id="search-query-input" v-model.lazy="searchQuery"
             :placeholder="$lang.searchContent.search_for + '...'"/></br>
      <span id="resultHeadline"
            v-if="searchQuery"><b>{{this.pagination.totalEntrys}}</b> {{$lang.searchContent.searchResults_for}} <b>"{{this.searchQuery}}"</b></span>
    </div>

    <div class="md-layout clear">
      <search-filter class="md-layout-item" @newFilter="updateFilter"/>

      <div id="items-per-page-picker" class="md-layout-item">
        <md-field>
          <label for="itemsPerPage">{{$lang.searchContent.items_per_page}}</label>
          <md-select v-model.number="pagination.itemsPerPage" name="itemsPerPage" id="itemsPerPage">
            <md-option v-for="item in itemsPerPage" :value="item">{{item}}</md-option>
          </md-select>
        </md-field>
      </div>

      <div v-if="readOnly != true" id="viewToggle" class="md-layout-item">
        <md-button class="md-toggle" v-bind:class="{ 'md-primary md-raised':  gutter}" v-on:click="gutter = true">
          {{$lang.buttons.card}}
        </md-button>
        <md-button class="md-toggle" v-bind:class="{ 'md-primary md-raised': !gutter}"
                   v-on:click="gutter = false; tableEnabled = true">
          {{$lang.buttons.list}}
        </md-button>
      </div>
    </div>

    <div id="content" class="md-layout md-gutter clear" v-show="gutter">
      <div class="card-wrapper md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-20" v-for="item in data"
           :key="item._id  + '#card'">
        <contentCard v-bind:data="item"/>
      </div>
    </div>
    <table v-show="!gutter" v-if="tableEnabled && readOnly != true">
      <thead>
      <tr>
        <th>{{$lang.edit.form.title}}</th>
        <th>{{$lang.edit.form.url}}</th>
        <th class="hide-s">{{$lang.edit.form.license}}</th>
        <th class="hide-m">{{$lang.edit.form.categorie}}</th>
      </tr>
      </thead>
      <contentRow v-for="item in data" :key="item._id + '#table'" v-bind:contentData="item"
                  @delete="deleteEntry"/>
    </table>
    <md-empty-state v-if="data.length == 0" class="md-primary"
                    md-icon="error_outline"
                    :md-label="$lang.searchContent.nothing_found"
                    :md-description="$lang.searchContent.nothing_found_help">
    </md-empty-state>
    <pagination @pageChanged="pageChanged" v-bind:config="pagination"/>
  </div>
</template>

<script>
  import contentCard from '@/components/base/card.vue';
  import pagination from '@/components/base/pagination.vue';
  import filter from './filter.vue';

  const contentTableRow = () => import(/* webpackChunkName: "contentTableRow" */ '@/components/base/table.vue');

  const qs = require('query-string');

  export default {
    components: {
      contentCard,
      'search-filter': filter,
      pagination,
      contentRow: contentTableRow,
    },
    name: 'contentList',
    props: {
      "search": { type: Boolean, default: false },
      "searchConfig": { type: Object, default: undefined },
      "tableview": { type: Boolean, default: false },
      "tableConfig": { type: Object, default: undefined },
      "itemsPerPage": { type: Array, default: [12,24,48,96] },
      "filter": { type: Array, default: [] },
      "contentAdapter": { type: Function, default: undefined }
    },
    data() {
      return {
        data: [],
        gutter: true,
        tableEnabled: false,
        searchQuery: '',
        apiFilterQuery: {},
        urlQuery: {},
        pagination: {
          page: 1,
          itemsPerPage: 12,
          totalEntrys: 0,
          buttonRange: 2,
          scroll: {
            top: 0,
            left: 0,
            behavior: 'smooth',
          },
        },
      };
    },
    created() {
      if (this.$router) {
        this.searchQuery = this.$route.query.q || '';
        this.pagination.page = parseInt(this.$route.query.p) || 1;
      } else {
        const query = qs.parse(location.search) || {};
        this.searchQuery = query.q || '';
        this.pagination.page = parseInt(query.p) || 1;
      }
      this.loadContent();
      window.onhashchange = this.urlChangeHandler;
    },
    methods: {
      pageChanged(page) {
        this.pagination.page = page;
        this.loadContent();
      },
      updateURL(newQuery) {
        if (this.$router) {
          this.$router.push({query: newQuery});
        } else if (history.pushState) {
          const newurl =
            `${window.location.protocol
              }//${
              window.location.host
              }${window.location.pathname
              }?${
              qs.stringify(newQuery)}`;
          window.history.pushState({path: newurl}, '', newurl);
        }
      },
      loadContent() {
        // clear data to show "loading state"
        const page = this.pagination.page || 1; // pagination for request
        const searchString = this.searchQuery || ''; // query for search request

        // set unique url
        this.urlQuery.q = searchString;
        this.urlQuery.p = page;
        this.updateURL(this.urlQuery);

        // build request path and fetch new data
        const searchQuery = {
          $limit: this.pagination.itemsPerPage,
          $skip: this.pagination.itemsPerPage * (page - 1),
          '_all[$match]': searchString,
        };

        const queryString = qs.stringify(Object.assign(searchQuery, this.apiFilterQuery));
        const path =
          searchString.length == 0
            ? this.$config.API.getPath
            : `${this.$config.API.searchPath}?${queryString}`;
        this.$http
          .get(this.$config.API.baseUrl + this.$config.API.port + path, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          })
          .then((response) => {
            this.data = response.data.data;
            this.pagination.totalEntrys = response.data.total;
          })
          .catch((e) => {
            console.error(e);
          });
      },
      urlChangeHandler() {
        // handle url changes
        if (this.$router) {
          this.searchQuery = this.$route.query.q;
          this.pagination.page = parseInt(this.$route.query.p);
        } else {
          const query = qs.parse(location.search);
          if (this.searchQuery != query.q) {
            this.searchQuery = query.q;
          }
          if (this.pagination.page != parseInt(query.p)) {
            this.pagination.page = parseInt(query.p);
          }
        }
      },
      updateFilter(newApiQuery, newUrlQuery) {
        this.apiFilterQuery = newApiQuery;
        this.urlQuery = newUrlQuery;
        this.loadContent();
      },
      deleteEntry(id) {
        this.data.forEach((entry, index) => {
          if (entry._id == id) {
            this.data.splice(index, 1);
          }
        });
      },
    },
    watch: {
      searchQuery(to, from) {
        if (to != from) {
          if (from != '') {
            this.pagination.page = 1;
          }
          this.loadContent();
        }
      },
      'pagination.page': function (to, from) {
        if (to != from) {
          this.loadContent();
        }
      },
      'pagination.itemsPerPage': function (to, from) {
        if (to != from) {
          this.loadContent();
        }
      },
      selectedProviders(to, from) {
        if (to != from) {
          this.loadContent();
        }
      },
    },
  };
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import "../default";
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #items-per-page-picker {
    margin: 0 16px;
    max-width: 120px;
  }
  #viewToggle {
    margin-top: 16px;
    max-width: 181px;
    .md-button {
      margin: 0;
    }
  }
  #content{
    width: 100%;
    margin: 0 !important;
  }

  .md-layout.md-gutter>.card-wrapper.md-layout-item{
    padding: 5px;
    box-sizing: border-box;
  }

  .clear{
    clear: both;
  }

  table {
    width: 100%;
  }

  #search-input {
    font-size: 1.75em !important;
    margin-top: 16px;
    float: left;
    width: calc(100% - 200px);
    margin-bottom: 16px;
    #search-query-input {
      display: inline-block;
      font-size: 1em;
      line-height: 1em;
      width: 100%;
      max-width: 500px;
      padding: 0;
      margin: 0;
      margin-left: 5px;
      outline: none;
      background: transparent;
      border: none;
      color: inherit;
      border-bottom: 1px solid grey;
      &:focus {
        color: var(--md-theme-default-primary);
        border-bottom: 1px solid var(--md-theme-default-primary);
      }
    }
    #resultHeadline {
      font-size: 1rem;
      display: block;
    }
  }
</style>
