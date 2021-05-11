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
          <select
            :ref="name"
            :class="classList"
            :id="name"
            :name="name"
            :value="value"
            :data-val-rules="validation"
            :data-val-display="displayName"
            :data-val-with="valWith"
            :data-val-allow-empty="optional"
            @change="handleChangeEvent"
          >
            <option
              v-for="option in options"
              :key="option.description + option.code"
              :value="option.code"
              >{{ option.description }}</option
            >
          </select>
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
import baseMixin from "./../mixins/baseMixin";

export default {
  name: "simple-select",
  mixins: [baseMixin, apiMixin],
  props: {
    list: {
      // list to be used for options
      type: [String, Array],
      required: true
    },
    searchUrl: {
      // url used to fetch options after user typed something
      type: String,
      default: "/get-list/"
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
    handleChangeEvent(e) {
      this.$emit("input", e.target.value);

      let val = e.target.value;
      let desc = this.options.find(obj => {
        return obj.code === val;
      }).description;

      this.$emit("select", {
        event: "select",
        name: this.name,
        value: val,
        description: desc
      });
    },
    applyDefault() {
      if (this.value) {
        const index = this.options.findIndex(opt => opt.code === this.value);

        if (index === -1) {
          console.warn(
            `Default option coming from the value attribute on --${this.name}-- is does not match any option.`
          );
        } else {
          this.$refs[this.name].value = this.value;
        }
      }
    },
    async setArrayOptions() {
      return new Promise(resolve => {
        this.options = this.list;
        this.options.unshift({ code: "", description: "- Please choose -" });
        resolve();
      });
    },
    async setAjaxOptions() {
      const list = await this.fetchList(this.list);
      return new Promise(resolve => {
        this.options = list.list;
        resolve();
      });
    },
    async setOptions() {
      if (Array.isArray(this.list)) {
        await this.setArrayOptions();
      }

      if (typeof this.list === "string" || this.list instanceof String) {
        await this.setAjaxOptions();
      }
    }
  },
  async mounted() {
    this.setClassObserver();
    await this.setOptions();
    this.applyDefault();
  }
};
</script>

<style scoped></style>
