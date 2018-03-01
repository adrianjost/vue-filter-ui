import Vue from 'vue';
import './base.js'
import VueCustomElement from "vue-custom-element";
import Module from './components/filter';

Vue.use(VueCustomElement);
Vue.customElement('feathers-filter', Module);
