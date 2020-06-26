import valForm from "valform";
import "./simple.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faCheck,
  faQuestionCircle,
  faPhoneAlt,
  faMobileAlt,
  faSpinner,
  faAt,
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faAddressCard,
  faHome,
  faCar,
  faTaxi,
  faTruck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faTimes,
  faCheck,
  faQuestionCircle,
  faPhoneAlt,
  faMobileAlt,
  faSpinner,
  faAt,
  faEnvelope,
  faUser,
  faMapMarkerAlt,
  faAddressCard,
  faHome,
  faCar,
  faTaxi,
  faTruck
]);

valForm.addValMethod("has_valid_value", field => {
  return document
    .getElementsByName(field.name)[0]
    .classList.contains("simple__selected");
});

valForm.addValMessage(
  "has_valid_value",
  "The %s field doesn't seem to have a valid value."
);

import SimpleInput from "./components/SimpleInput.vue";
import SimpleDate from "./components/SimpleDate.vue";
import SimpleSortCode from "./components/SimpleSortCode.vue";
import SimpleSelect from "./components/SimpleSelect.vue";
import SimpleRadio from "./components/SimpleRadio.vue";
import SimpleCheckbox from "./components/SimpleCheckbox.vue";
import SimpleListAutocomplete from "./components/SimpleListAutocomplete.vue";
import SimpleAjaxAutocomplete from "./components/SimpleAjaxAutocomplete.vue";

export default {
  install(Vue) {
    Vue.component("simple-input", SimpleInput);
    Vue.component("simple-date", SimpleDate);
    Vue.component("simple-select", SimpleSelect);
    Vue.component("simple-radio", SimpleRadio);
    Vue.component("simple-checkbox", SimpleCheckbox);
    Vue.component("simple-sort-code", SimpleSortCode);
    Vue.component("simple-list-autocomplete", SimpleListAutocomplete);
    Vue.component("simple-ajax-autocomplete", SimpleAjaxAutocomplete);
    Vue.component("fa-icon", FontAwesomeIcon);
  }
};
