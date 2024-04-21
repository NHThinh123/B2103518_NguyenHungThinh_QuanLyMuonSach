<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <div class="container mt-3">
      <AppHeader></AppHeader>
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  margin: auto;
}
</style>
