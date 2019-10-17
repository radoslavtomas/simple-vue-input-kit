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
          <fa-icon class="simple__hint__icon" icon="question-circle"></fa-icon>Need help?
        </sup>
      </label>

      <div class="simple__input__inner">
        <div class="inner__left inner__radio" :class="[{ 'column':column }, classList]">
          <div
            class="simple__input__radio"
            v-for="option in options"
            :class="{ 'active':(option.code === value), 'valid':inputValid, 'error':inputError, 'column':column }"
            :key="option.code"
            @click="chooseOption(option)"
          >{{ option.description }}</div>

          <input
            type="hidden"
            :ref="name"
            :id="name"
            :name="name"
            :value="value"
            :data-val-rules="validation"
            :data-val-display="displayName"
            :data-val-with="valWith"
            :data-val-allow-empty="optional"
          />
        </div>

        <div class="simple__input__feedback">
          <fa-icon v-if="inputValid" class="simple__input__feedback__valid" icon="check"></fa-icon>
          <fa-icon v-if="inputError" class="simple__input__feedback__error" icon="times"></fa-icon>
        </div>
      </div>
    </div>
    <div
      v-if="hint"
      class="simple__help__btn mobile"
      :class="`help__btn__${name}`"
      @click="openHelp"
    >
      <fa-icon class="simple__hint__icon" icon="question-circle"></fa-icon>Need help?
    </div>
  </div>
</template>

<script>
import apiMixin from "./../mixins/apiMixin";
import baseMixin from "./../mixins/baseMixin";
import valForm from "valform";

export default {
  name: "simple-radio",
  mixins: [baseMixin, apiMixin],
  props: {
    list: {
      // list to be used for options
      type: [String, Array],
      required: true
    },
    column: {
      // if provided it will be rendered as a column instead of row
      type: Boolean,
      default: false
    },
    searchUrl: {
      // url used to fetch options after user typed something
      type: String,
      default: '/get-list/'
    },
  },
  data() {
    return {
      options: [],
      yesno: [
        { code: "Y", description: "Yes" },
        { code: "N", description: "No" }
      ]
    };
  },
  methods: {
    chooseOption(option) {
      this.$emit("input", option.code);

      this.$emit("select", {
        event: "select",
        name: this.name,
        value: option.code,
        description: option.description
      });

      valForm.validateHidden(this.name, option.code);
    },
    async setArrayOptions() {
      return new Promise(resolve => {
        this.options = this.list;
        resolve();
      });
    },
    async setAjaxOptions() {
      const list = await this.fetchList(this.list);
      return new Promise(resolve => {
        this.options = list.list;
        // remove first option as it is "Please choose" option
        this.options.shift();
        resolve();
      });
    },
    async setOptions() {
      if (Array.isArray(this.list)) {
        return await this.setArrayOptions();
      }

      if (typeof this.list === "string" || this.list instanceof String) {
        if (this.list === "yesno") {
          this.options = this.yesno;
        } else {
          return await this.setAjaxOptions();
        }
      }
    }
  },
  async mounted() {
    this.setClassObserver();
    await this.setOptions();
  }
};
</script>

<style scoped>
/*@import "./../assets/qld.css";*/
</style>