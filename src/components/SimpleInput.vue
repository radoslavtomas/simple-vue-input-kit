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
      <label :for="name">
        {{ label }}
        <sup
          v-if="hint"
          class="simple__help__btn"
          :class="`help__btn__${name}`"
          @click.prevent="openHelp"
        >
          <fa-icon class="simple__hint__icon" icon="question-circle"></fa-icon
          >Need help?
        </sup>
      </label>

      <div class="simple__input__inner">
        <div class="inner__left">
          <div
            class="simple__input__before"
            v-if="beforeSign"
            :class="{ valid: inputValid, error: inputError }"
          >
            <fa-icon :icon="beforeSign"></fa-icon>
          </div>
          <input
            :ref="name"
            class
            :class="classList"
            :id="name"
            :name="name"
            :type="type"
            :value="value"
            :placeholder="placeholder"
            :data-val-rules="validation"
            :data-val-display="displayName"
            :data-val-with="valWith"
            :data-val-allow-empty="optional"
            @input="handleInputEvent"
            @change="handleChangeEvent"
          />
        </div>

        <!-- <div class="simple__input__feedback">
          <fa-icon
            v-if="inputValid"
            class="simple__input__feedback__valid"
            icon="check"
          ></fa-icon>
          <fa-icon
            v-if="inputError"
            class="simple__input__feedback__error"
            icon="times"
          ></fa-icon>
        </div>-->
      </div>
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

export default {
  name: "simple-input",
  mixins: [baseMixin],
  props: {
    type: {
      // input type, date and hidden would not work properly
      type: [String, Number],
      default: "text",
      required: true,
      validator(val) {
        return ["text", "number", "tel", "email"].indexOf(val) !== -1;
      }
    },
    placeholder: {
      // placeholder attribute
      type: String,
      default: ""
    },
    beforeSign: {
      // if provided it will be rendered on the input's left side
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isUpperCase: false
    };
  },
  methods: {
    handleInputEvent(e) {
      let val = this.setFontTransform(e.target.value);
      this.$emit("input", val);
    },
    handleChangeEvent(e) {
      let val = this.setFontTransform(e.target.value);
      this.$emit("change", {
        event: "change",
        name: this.name,
        value: val
      });
    },
    setFontTransform(val) {
      let value = val.trim();
      return this.isUpperCase ? value.toUpperCase() : value;
    }
  },
  mounted() {
    this.setClassObserver();

    // control if value should be uppercase, e.g. postcode
    if (this.$refs[this.name].classList.contains("uppercase")) {
      this.isUpperCase = true;
    }
  }
};
</script>

<style></style>
