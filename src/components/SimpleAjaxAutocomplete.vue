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

          <!-- spinner when calling API -->
          <fa-icon
            v-if="searching"
            icon="spinner"
            class="simple__autocomplete__spinner"
            spin
          ></fa-icon>

          <!-- code value  -->
          <input type="hidden" :name="name" :value="codeValue" />

          <!-- autocomplete list loaded from API -->
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

        <!-- feedback icons -->
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
      <!-- simple__input__inner end -->
    </div>
    <!-- simple__input end -->

    <!-- mobile help -->
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
import { debounce } from "lodash-es";

export default {
  name: "simple-ajax-autocomplete",
  mixins: [baseMixin, apiMixin, autocompleteMixin],
  props: {
    placeholder: {
      // placeholder attribute
      type: String,
      default: ""
    },
    codeUrl: {
      // url used to fetch description of a code after component was mounted
      type: String,
      required: true
    },
    beforeSign: {
      // if provided it will be rendered on the input's left side
      type: String,
      default: ""
    },
    development: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searching: false
    };
  },
  methods: {
    async handleInputEvent(e) {
      // reset code value and validation class if user interact
      this.codeValue = "";
      this.$refs[this.name].classList.remove("simple__selected");

      let value = e.target.value;
      this.$emit("input", value);

      if (value.length > 0) {
        // in this way we can debounce this method
        if (this.development) {
          this.searchForListDev(value);
        } else {
          this.searchForList(value);
        }
      } else {
        this.optionsToShow = [];
      }
    },
    searchForList: debounce(async function(value) {
      this.searching = true;

      let list = await this.fetchList(value);

      let index = Object.keys(list)[0];
      this.optionsToShow = list[index].slice(0, 5);

      this.searching = false;

      for (let option of this.optionsToShow) {
        if (value === option.description) {
          this.setResult(option);
        }
      }
    }, 250),
    searchForListDev: debounce(async function(value) {
      this.searching = true;

      let list = await this.getData(this.searchUrl);

      this.optionsToShow = list.list
        .filter(option => {
          let opt = option.description.toLowerCase();
          let val = value.toLowerCase();
          return opt.indexOf(val) != -1;
        })
        .slice(0, 5);

      this.searching = false;

      for (let option of this.optionsToShow) {
        if (value === option.description) {
          this.setResult(option);
        }
      }
    }, 250),
    async fetchValueByCode(initialLoad = false) {
      if (!this.value) {
        return;
      }

      if (typeof this.value === "string" && this.value.length > 4) {
        this.$emit("input", "");
        return;
      }

      // hide code value when initially loading
      const tempVal = this.value;
      if (initialLoad) {
        this.$emit("input", "");
      }

      try {
        this.searching = true;
        const data = await this.getData(`${this.codeUrl}${tempVal}`);
        const option = {
          code: tempVal,
          description: data.description
        };
        // console.log(option);

        this.setResult(option, false);
        this.searching = false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchValueByCodeDev() {
      if (!this.value) {
        return;
      }

      try {
        this.searching = true;
        const list = await this.getData(this.codeUrl);

        const option = {
          code: this.value,
          description: ""
        };

        for (let item of list.list) {
          if (this.value === item.code) {
            option.description = item.description;
            this.setResult(option, false);
          }
        }

        this.searching = false;
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    window.addEventListener("simple-force-refresh", async () => {
      setTimeout(async () => {
        await this.fetchValueByCode(true);
      }, 300);
    });
    this.setClassObserver();
    if (this.development) {
      this.fetchValueByCodeDev();
    } else {
      await this.fetchValueByCode(true);
    }
  }
};
</script>

<style></style>
