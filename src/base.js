// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './components/filter-wrapper';
import VueMaterial from 'vue-material';
//import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

Vue.config.silent = false;
Vue.config.performance = true;
Vue.config.productionTip = false;
