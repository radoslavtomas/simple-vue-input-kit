<template>
  <div class="simple__help" v-if="openHelp">
    <div class="simple__help__close" @click="closeHelp">
      <fa-icon icon="times"></fa-icon>
    </div>
    <header>{{ label }}</header>
    <main>
      <p v-html="hint"></p>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // open: false
    };
  },
  props: ["label", "hint", "openHelp", "name"],
  methods: {
    closeHelp() {
      this.$emit("closeHelp");
    },
    onClick(event) {
      let clickedEl = event.target;

      if (!this.$el.contains(clickedEl)) {
        if (clickedEl.classList.contains(`help__btn__${this.name}`)) {
          this.$emit("closeHelp", { close: false });
        } else {
          this.$emit("closeHelp", { close: true });
        }
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  }
};
</script>

<style>
</style>
