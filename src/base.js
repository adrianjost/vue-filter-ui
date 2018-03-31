// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"; // needed for single vue-material component import
import Vue from 'vue';
import VueMaterial from 'vue-material';
//import { MdIcon, MdChips, MdButton, MdMenu, MdDialog, MdCheckbox, MdRadio, MdField, MdList, MdDatepicker } from 'vue-material/dist/components'
//import 'vue-material/dist/vue-material.min.css';
import './default.scss';

Vue.use(VueMaterial);
/*
Vue.use(MdIcon);
Vue.use(MdChips);
Vue.use(MdButton);
Vue.use(MdMenu);
Vue.use(MdDialog);
Vue.use(MdCheckbox);
Vue.use(MdRadio);
Vue.use(MdField);
Vue.use(MdList);
Vue.use(MdDatepicker);
*/

Vue.config.silent = false;
Vue.config.performance = true;
Vue.config.productionTip = false;
