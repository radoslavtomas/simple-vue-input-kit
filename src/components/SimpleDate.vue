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
              v-model="day"
              ref="day"
              placeholder="DD"
              @blur="handleDateBlur"
            />
            <div class="simple__input__date__divider">/</div>
            <input
              type="tel"
              class="simple__input__date__month"
              v-model="month"
              ref="month"
              placeholder="MM"
              @blur="handleDateBlur"
            />
            <div class="simple__input__date__divider">/</div>
            <input
              type="tel"
              class="simple__input__date__year"
              v-model="year"
              ref="year"
              placeholder="YYYY"
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
  name: "simple-date",
  mixins: [baseMixin],
  data() {
    return {
      day: "",
      month: "",
      year: "",
      mounting: false
    };
  },
  computed: {
    fullDate() {
      if (
        this.day.length !== 0 ||
        this.month.length !== 0 ||
        this.year.length !== 0
      ) {
        return this.day + "/" + this.month + "/" + this.year;
      } else {
        return "";
      }
    }
  },
  watch: {
    day() {
      if (this.day.length === 2) {
        this.$refs.month.focus();
        this.$refs.month.select();
        this.$refs.month.setSelectionRange(0, 9999);
      }
    },
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

      if (this.day.length === 1) {
        this.day = "0" + this.day;
      }

      if (this.month.length === 1) {
        this.month = "0" + this.month;
      }

      // this.$emit("input", this.fullDate);

      // this.$emit("blur", {
      //   event: "blur",
      //   name: this.name,
      //   value: this.fullDate
      // });

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
      const dayCheck = this.checkActiveElement(this.$refs.day);
      const monthCheck = this.checkActiveElement(this.$refs.month);
      const yearCheck = this.checkActiveElement(this.$refs.year);

      if (dayCheck || monthCheck || yearCheck) {
        return true;
      }

      return false;
    },
    async setValue() {
      return new Promise(resolve => {
        if (this.value) {
          const regex = /\d{2}\/\d{2}\/\d{4}/;
          if (!this.value.match(regex)) {
            console.warn(
              `Default date coming from the value attribute on --${this.name}-- is not valid one.`
            );
            resolve();
          } else {
            const dateParts = this.value.split("/");
            this.day = dateParts[0];
            this.month = dateParts[1];
            this.year = dateParts[2];
            resolve();
          }
        }

        resolve();
      });
    }
  },
  async mounted() {
    window.addEventListener("simple-force-refresh", async () => {
      setTimeout(async () => {
        this.mounting = true;
        await this.setValue();
        this.mounting = false;
      }, 200);
    });

    this.mounting = true;

    await this.setValue();
    this.setClassObserver();

    this.mounting = false;
  }
};
</script>

<style scoped></style>
