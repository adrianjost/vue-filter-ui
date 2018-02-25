import Vue from 'vue';
import './main.js'
import VueCustomElement from "vue-custom-element";
import Module from './components/filter';

Vue.use(VueCustomElement);
Vue.customElement('content-search', Module);
