import Vue from "vue";
import App from "./App.vue";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faTimes,
//   faCheck,
//   faQuestionCircle,
//   faPhoneAlt,
//   faSpinner
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import valForm from "valform";
import SimpleKit from './index';

// library.add([faTimes, faCheck, faQuestionCircle, faPhoneAlt, faSpinner]);
//
// Vue.component("fa-icon", FontAwesomeIcon);

Vue.use(SimpleKit);

Vue.config.productionTip = false;

// valForm.addValMethod("has_valid_value", field => {
//   return document
//     .getElementsByName(field.name)[0]
//     .classList.contains("simple__selected");
// });
//
// valForm.addValMessage(
//   "has_valid_value",
//   "The %s field doesn't seem to have a valid value."
// );

new Vue({
  render: h => h(App)
}).$mount("#app");
