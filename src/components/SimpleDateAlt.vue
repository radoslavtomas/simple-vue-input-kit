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
              class="simple__input__date__month"
              placeholder="MM"
              v-model="month"
              ref="month"
              @blur="handleDateBlur"
            />
            <div class="simple__input__date__divider">/</div>
            <input
              type="tel"
              placeholder="YYYY"
              class="simple__input__date__year"
              v-model="year"
              ref="year"
              @blur="handleDateBlur"
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
  name: "simple-date-alt",
  mixins: [baseMixin],
  data() {
    return {
      month: "",
      year: "",
      mounting: false
    };
  },
  computed: {
    fullDate() {
      if (this.month.length !== 0 && this.year.length === 4) {
        return this.year + this.month;
      } else {
        return "";
      }
    }
  },
  watch: {
    month() {
      if (this.month.length === 2) {
        this.$refs.year.focus();
        this.$refs.year.select();
        this.$refs.year.setSelectionRange(0, 9999);
      }
    },
    year() {
      if (this.year.length === 4) {
        this.$refs.year.blur();
      }
    }
  },
  methods: {
    handleDateBlur() {
      // don't trigger blur event when applying default
      // in mounted hook
      if (this.mounting) {
        return false;
      }

      if (this.month.length === 1) {
        this.month = "0" + this.month;
      }

      setTimeout(async () => {
        // check active element after a little pause
        // as straight after blur it will be document
        if (!this.checkActiveDate()) {
          const nearestForm = this.getNearestForm(this.$refs[this.name]);
          await valForm.validateHidden(
            this.name,
            this.fullDate,
            nearestForm.id
          );

          this.$emit("input", this.fullDate);

          this.$emit("blur", {
            event: "blur",
            name: this.name,
            value: this.fullDate
          });
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
      const monthCheck = this.checkActiveElement(this.$refs.month);
      const yearCheck = this.checkActiveElement(this.$refs.year);

      if (monthCheck || yearCheck) {
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
              `Default date coming from the value attribute on --${this.name}-- is not valid one.`
            );
            resolve();
          } else {
            this.year = this.value.slice(0, 4);
            this.month = this.value.slice(4, 6);
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
