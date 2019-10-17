import Vue from "vue";
import App from "./App.vue";

import SimpleKit from "./index";

Vue.use(SimpleKit);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
