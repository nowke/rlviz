import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { syncGridStorage } from "./utils";

Vue.config.productionTip = false;
Vue.use(Chartkick.use(Chart));

new Vue({
  store,
  beforeCreate() {
    syncGridStorage(this.$store);
    this.$store.commit("grid/initializeGridsFromStorage");
  },
  vuetify,
  render: h => h(App)
}).$mount("#app");
