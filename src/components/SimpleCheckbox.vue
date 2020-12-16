<template>
  <div class="simple__form__field" :class="topClassList">
    <SimpleHelp
      :label="label"
      :hint="hint"
      :openHelp="helpIsOpen"
      :name="name"
      @closeHelp="closeHelp"
      v-if="hint"
    />

    <div class="simple__input">
      <label for v-if="label !== 'hidden'">{{ label }}</label>
      <div class="simple__input__inner checkbox__wrap">
        <div v-for="item in checkboxes" :key="item.name">
          <div
            tabindex="0"
            class="inner__left inner__checkbox"
            :class="[classList]"
            @click="toggleBox(item.name)"
          >
            <div
              class="simple__input__checkbox"
              :class="{
                active: value,
                valid: inputValid,
                error: inputError
              }"
            >
              <fa-icon icon="check" class="fa-lg" v-if="item.checked"></fa-icon>
            </div>

            <label :for="name" v-if="item.label !== 'hidden'">
              {{ item.label }}
            </label>
          </div>
        </div>
      </div>

      <input
        type="hidden"
        :ref="name"
        :id="name"
        :name="name"
        :value="validationValue"
        :data-val-rules="validation"
        :data-val-display="displayName"
        :data-val-with="valWith"
        :data-val-allow-empty="optional"
      />
    </div>
    <div
      v-if="hint"
      class="simple__help__btn"
      :class="`help__btn__${name}`"
      @click="openHelp"
    >
      <fa-icon class="simple__hint__icon" icon="question-circle"></fa-icon>Need
      help?
    </div>
    <div
      v-if="hint"
      class="simple__help__btn mobile"
      :class="`help__btn__${name}`"
      @click="openHelp"
    >
      <fa-icon class="simple__hint__icon" icon="question-circle"></fa-icon>Need
      help?
    </div>
  </div>
</template>

<script>
import baseMixin from "./../mixins/baseMixin";
import valForm from "valform";

export default {
  name: "simple-checkbox",
  mixins: [baseMixin],
  props: {
    return: {
      type: String,
      default: "bool",
      required: false,
      validator(val) {
        return ["bool", "zero-one", "yes-no"].indexOf(val) !== -1;
      }
    },
    boxes: {
      type: Array
    }
  },
  data() {
    return {
      checkboxes: [],
      checked: false
    };
  },
  beforeMount() {
    this.checkboxes = this.boxes.map(item => {
      item.checked = false;
      return item;
    });
  },
  methods: {
    async toggleBox(name) {
      this.checkboxes = this.checkboxes.map(box => {
        if (box.name === name) {
          box.checked = !box.checked;
        }
        return box;
      });

      const values = this.getAllValues();

      this.$emit("input", values);

      this.$emit("select", {
        event: "select",
        input: "checkbox",
        name: this.name,
        values: values
      });

      if (!this.optional) {
        const nearestForm = this.getNearestForm(this.$refs[this.name]);
        await valForm.validateHidden(
          this.name,
          this.validationValue,
          nearestForm.id
        );
      }
    },
    getNearestForm(element) {
      let parent = element.parentNode;

      if (parent.nodeName === "FORM") {
        return parent;
      } else if (parent.nodeName === "BODY") {
        console.warn(
          "valForm validation broken. No form parent element found on the page."
        );
        return false;
      } else {
        return this.getNearestForm(parent);
      }
    },
    getAllValues() {
      let data = {};

      this.checkboxes.forEach(box => {
        data[box.name] = this.returnValue(box.checked);
      });

      return data;
    },
    returnValue(val) {
      switch (this.return) {
        case "bool":
          return val;

        case "yes-no":
          return val ? "Y" : "N";

        case "zero-one":
          return val ? 1 : 0;

        default:
          return val;
      }
    },
    setAllValues() {
      if (!this.value) {
        return;
      }

      Object.keys(this.value).forEach(name => {
        this.checkboxes = this.checkboxes.map(box => {
          if (box.name === name) {
            const boolValue = this.getBooleanValue(this.value[name]);
            box.checked = boolValue;
          }
          return box;
        });
      });
    },
    getBooleanValue(val) {
      switch (this.return) {
        case "bool":
          return val;

        case "yes-no":
          return val === "Y" ? true : false;

        case "zero-one":
          return val === 1 ? true : false;

        default:
          return false;
      }
    }
  },
  computed: {
    validationValue() {
      let value = 0;

      this.checkboxes.forEach(box => {
        if (box.checked) {
          value++;
        }
      });

      return value === 0 ? "" : value.toString();
    }
  },
  mounted() {
    window.addEventListener("simple-force-refresh", async () => {
      setTimeout(async () => {
        this.setAllValues();
      }, 200);
    });

    this.setClassObserver();
    this.setAllValues();
  }
};
</script>

<style scoped></style>
