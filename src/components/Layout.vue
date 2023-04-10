<template>
  <div :class="{ layout: !isMobile, 'layout-mobile': isMobile }">
    <slot />
  </div>
</template>
  <script>
export default {
  name: "Layout",

  data() {
    return {
      screenWidth: 0,
      isMobile: false,
    };
  },

  created() {
    window.addEventListener("resize", this.updateScreenWidth);
    this.updateScreenWidth();
  },

  destroyed() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },

  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
      this.isMobile = this.screenWidth <= 768;
    },
  },
};
</script>
  
  <style>
.layout {
  padding-top: 100px;
}

.layout-mobile {
  padding-top: 20px;
}
</style>