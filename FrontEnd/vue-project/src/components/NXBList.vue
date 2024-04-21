<script>
export default {
  props: {
    NXBs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
      console.log(this.activeIndex);
    },
  },
};
</script>
<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(NXB, index) in NXBs"
      :key="NXB._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ NXB.TenNXB }}
    </li>
  </ul>
</template>
