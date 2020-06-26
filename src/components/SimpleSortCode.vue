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
            class="simple__input__date"
            :class="[{ valid: inputValid, error: inputError }, classList]"
          >
            <input
              type="tel"
              class="simple__input__date__day"
              v-model="one"
              ref="one"
              @blur="handleCodeBlur"
            />
            <div class="simple__input__date__divider">-</div>
            <input
              type="tel"
              class="simple__input__date__month"
              v-model="two"
              ref="two"
              @blur="handleCodeBlur"
            />
            <div class="simple__input__date__divider">-</div>
            <input
              type="tel"
              class="simple__input__date__year"
              v-model="three"
              ref="three"
              @blur="handleCodeBlur"
            />
          </div>

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
import valForm from "valform";

export default {
  name: "simple-sort-code",
  mixins: [baseMixin],
  data() {
    return {
      one: "",
      two: "",
      three: "",
      mounting: false
    };
  },
  computed: {
    fullCode() {
      if (
        this.one.length !== 0 ||
        this.two.length !== 0 ||
        this.three.length !== 0
      ) {
        return `${this.one}${this.two}${this.three}`;
      } else {
        return "";
      }
    }
  },
  watch: {
    one() {
      if (this.one.length === 2) {
        this.$refs.two.focus();
        this.$refs.two.select();
        this.$refs.two.setSelectionRange(0, 9999);
      }
    },
    two() {
      if (this.two.length === 2) {
        this.$refs.three.focus();
        this.$refs.three.select();
        this.$refs.three.setSelectionRange(0, 9999);
      }
    },
    three() {
      if (this.three.length === 2) {
        this.$refs.three.blur();
      }
    }
  },
  methods: {
    handleCodeBlur() {
      // don't trigger blur event when applying default
      // in mounted hook
      if (this.mounting) {
        return false;
      }

      this.$emit("input", this.fullCode);

      this.$emit("blur", {
        event: "blur",
        name: this.name,
        value: this.fullCode
      });

      setTimeout(async () => {
        // check active element after a little pause
        // as straight after blur it will be document
        if (!this.checkActiveDate()) {
          const nearestForm = this.getNearestForm(this.$refs[this.name]);
          await valForm.validateHidden(
            this.name,
            this.fullCode,
            nearestForm.id
          );
        }
      }, 50);
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
    checkActiveElement(el) {
      if (el === document.activeElement) {
        return true;
      }

      return false;
    },
    checkActiveDate() {
      const oneCheck = this.checkActiveElement(this.$refs.one);
      const twoCheck = this.checkActiveElement(this.$refs.two);
      const threeCheck = this.checkActiveElement(this.$refs.three);

      if (oneCheck || twoCheck || threeCheck) {
        return true;
      }

      return false;
    },
    async setDefault() {
      return new Promise(resolve => {
        if (this.value) {
          const regex = /\d{6}/;
          if (!this.value.match(regex)) {
            console.warn(
              `Default sortcode coming from the value attribute on --${this.name}-- is not valid one.`
            );
            resolve();
          } else {
            this.one = this.value.slice(0, 2);
            this.two = this.value.slice(2, 4);
            this.three = this.value.slice(4);
            resolve();
          }
        }

        resolve();
      });
    }
  },
  async mounted() {
    this.mounting = true;

    await this.setDefault();
    this.setClassObserver();

    this.mounting = false;
  }
};
</script>

<style scoped></style>
