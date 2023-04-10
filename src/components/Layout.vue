<template>
  <div class="layout">
    <slot />
  </div>
</template>
  <script>
export default {
  name: "Layout",
};
</script>
  
  <style>
.layout {
  padding-top: 20px;
}

@media (min-width: 600px) {
  .layout {
    padding-top: 100px;
  }
}
</style>