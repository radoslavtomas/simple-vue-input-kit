import valForm from "valform";

export default {
  data() {
    return {
      elementIsActive: false,
      optionsToShow: [],
      arrowCounter: 0,
      codeValue: ""
    };
  },
  props: {
    searchUrl: {
      // url used to fetch options after user typed something
      type: String,
      required: true
    }
  },
  computed: {
    showAutocompleteList() {
      return (
        this.elementIsActive &&
        this.value.length > 0 &&
        this.optionsToShow.length > 0
      );
    }
  },
  methods: {
    handleEnter() {
      this.setResult(this.optionsToShow[this.arrowCounter]);
    },
    handleUp() {
      if (this.arrowCounter < 1) {
        this.arrowCounter = this.optionsToShow.length - 1;
      } else {
        this.arrowCounter--;
      }
    },
    handleDown() {
      if (this.arrowCounter < this.optionsToShow.length - 1) {
        this.arrowCounter++;
      } else {
        this.arrowCounter = 0;
      }
    },
    handleFocusEvent() {
      this.elementIsActive = true;
    },
    handleBlurEvent() {
      // postpone blur so we can catch click event on li elements
      setTimeout(() => {
        this.elementIsActive = false;
      }, 400);
    },
    handleChangeEvent(e) {
      const value = e.target.value;

      if (this.optionsToShow.length > 0) {
        let emitted = false;
        for (let option of this.optionsToShow) {
          if (value === option.description) {
            this.emitChange(value, option.code);
            emitted = true;
          }
        }
        if (!emitted) {
          this.emitChange(value, null);
        }
      } else {
        this.emitChange(value, null);
      }
    },
    setResult(option, blur = true) {
      this.codeValue = option.code;
      this.$refs[this.name].classList.add("simple__selected");

      this.$emit("input", option.description);
      this.emitChange(option.description, option.code);

      // if this is called in mounted hook then don't blur
      if (blur) {
        this.$refs[this.name].blur();
        valForm.partialValidation(this.name + "-description");
      }

      this.optionsToShow = [];
      this.arrowCounter = 0;
    },
    emitChange(value, code) {
      this.$emit("change", {
        event: "change",
        name: this.name,
        value: value,
        code: code
      });
    }
  }
};
