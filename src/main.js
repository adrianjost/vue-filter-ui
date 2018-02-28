// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/filter-wrapper';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

const VueLang = require('vuejs-localization');
VueLang.requireAll(require.context('./lang', true, /\.js$/));
Vue.use(VueLang, {default: 'de'});

Vue.config.silent = false;
Vue.config.performance = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
}).$mount("#app");

