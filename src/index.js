import SimpleInput from "./components/SimpleInput.vue";
import SimpleDate from "./components/SimpleDate.vue";
import SimpleSelect from "./components/SimpleSelect.vue";
import SimpleRadio from "./components/SimpleRadio.vue";
import SimpleListAutocomplete from "./components/SimpleListAutocomplete.vue";
import SimpleAjaxAutocomplete from "./components/SimpleAjaxAutocomplete.vue";

export default {
  install(Vue) {
    Vue.component("simple-input", SimpleInput);
    Vue.component("simple-date", SimpleDate);
    Vue.component("simple-select", SimpleSelect);
    Vue.component("simple-radio", SimpleRadio);
    Vue.component("simple-list-autocomplete", SimpleListAutocomplete);
    Vue.component("simple-ajax-autocomplete", SimpleAjaxAutocomplete);
  }
};
