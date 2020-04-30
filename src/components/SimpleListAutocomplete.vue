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
            type="text"
            autocomplete="off"
            :ref="name"
            :class="classList"
            :id="name"
            :name="name + '-description'"
            :value="value"
            :placeholder="placeholder"
            :data-val-rules="validation"
            :data-val-display="displayName"
            :data-val-with="valWith"
            :data-val-allow-empty="optional"
            @input="handleInputEvent"
            @change="handleChangeEvent"
            @focus="handleFocusEvent"
            @blur="handleBlurEvent"
            @keyup.enter.prevent="handleEnter"
            @keyup.up="handleUp"
            @keyup.down="handleDown"
          />

          <input type="hidden" :name="name" :value="codeValue" />

          <div class="simple__autocomplete__list" v-if="showAutocompleteList">
            <ul>
              <li
                v-for="(option, index) in optionsToShow"
                :key="option.code"
                @click="setResult(option)"
                :class="{ active: index === arrowCounter }"
              >
                {{ option.description }}
              </li>
            </ul>
          </div>
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
import apiMixin from "./../mixins/apiMixin";
import autocompleteMixin from "./../mixins/autocompleteMixin";
import baseMixin from "./../mixins/baseMixin";

export default {
  name: "simple-list-autocomplete",
  mixins: [baseMixin, apiMixin, autocompleteMixin],
  props: {
    mainValue: {
      // used to determine which value will be used as default when loading data in mounted hook
      type: String, // available options are: 'code', 'description'
      default: "code"
    },
    list: {
      // list to be used for options
      type: String,
      required: true
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
      options: []
    };
  },
  methods: {
    handleInputEvent(e) {
      // reset code value and validation class if user interact
      this.codeValue = "";
      this.$refs[this.name].classList.remove("simple__selected");

      let value = e.target.value;
      this.$emit("input", value);

      this.optionsToShow = this.options
        .filter(option => {
          let opt = option.description.toLowerCase();
          let val = value.toLowerCase();
          return opt.indexOf(val) != -1;
        })
        .slice(0, 5);

      for (let option of this.optionsToShow) {
        if (value === option.description) {
          this.setResult(option);
        }
      }
    },
    async setOptions() {
      const list = await this.fetchList(this.list);
      return new Promise(resolve => {
        this.options = list.list;
        resolve();
      });
    },
    loadDefaults() {
      if (this.value) {
        for (let option of this.options) {
          if (this.value === option[this.mainValue]) {
            this.setResult(option, false);
          }
        }
      }
    }
  },
  async mounted() {
    await this.setOptions();
    this.setClassObserver();
    this.loadDefaults();
  }
};
</script>

<style scoped></style>
