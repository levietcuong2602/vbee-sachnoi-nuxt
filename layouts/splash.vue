<template>
  <div class="app-wrapper1">
    <div class="splash-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
