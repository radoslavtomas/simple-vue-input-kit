// import Vue from "vue";
// import valForm from "valform";
import SimpleHelp from "./../components/SimpleHelp.vue";

// import "./../simple.css";
//
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faTimes,
//   faCheck,
//   faQuestionCircle,
//   faPhoneAlt,
//   faSpinner
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//
// library.add([faTimes, faCheck, faQuestionCircle, faPhoneAlt, faSpinner]);
// Vue.component("fa-icon", FontAwesomeIcon);
//
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

export default {
  components: {
    SimpleHelp
  },
  data() {
    return {
      displayName: "",
      inputValid: false,
      inputError: false,
      helpIsOpen: false
    };
  },
  props: {
    name: {
      // name attribute
      type: String,
      required: true,
      validator(val) {
        return val.length > 0;
      }
    },
    label: {
      // used for label and validation display name (if not defined in "display" prop)
      type: String,
      required: true,
      validator(val) {
        return val.length > 0;
      }
    },
    display: {
      // display name for validation, if not defined then label will be used
      type: String
    },
    value: {
      // used for v-model in parent element
      type: String
    },
    hint: {
      // hint text, HTML characters will be accepted (they are not escaped)
      type: String,
      default: ""
    },
    validation: {
      // validation string, e.g. "required|max_length[32]"
      type: String,
      default: ""
    },
    valWith: {
      // name attribute of an input that should be used for validating with a current input
      type: [String, Array],
      default: ""
    },
    optional: {
      // used for validation, if true then input can be empty but as soon as there is any value rules will be applied
      type: Boolean,
      default: false
    },
    classList: {
      // classes to be applied to input itself
      type: [String, Array],
      default: ""
    },
    topClassList: {
      // classes to be applied on the top most div
      type: [String, Array],
      default: ""
    }
  },
  methods: {
    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(" ");

      if (classList.includes("error")) {
        this.inputValid = false;
        this.inputError = true;
      } else if (classList.includes("valid")) {
        this.inputValid = true;
        this.inputError = false;
      } else {
        this.inputValid = false;
        this.inputError = false;
      }
    },
    openHelp() {
      this.helpIsOpen = true;
    },
    closeHelp(data) {
      if (data) {
        if (data.close) {
          this.helpIsOpen = false;
          return false;
        } else {
          return false;
        }
      }

      this.helpIsOpen = false;
    },
    setClassObserver() {
      // observe class name of an input
      // so we can control validation behaviour
      this.observer = new MutationObserver(mutations => {
        for (const m of mutations) {
          const newValue = m.target.getAttribute(m.attributeName);
          this.$nextTick(() => {
            this.onClassChange(newValue, m.oldValue);
          });
        }
      });

      this.observer.observe(this.$refs[this.name], {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"]
      });
    }
  },
  beforeMount() {
    // set displayName -> used for validation messages
    this.displayName = this.display ? this.display : this.label;
  },
  beforeDestroy() {
    // clean after yourself
    this.observer.disconnect();
  }
};
