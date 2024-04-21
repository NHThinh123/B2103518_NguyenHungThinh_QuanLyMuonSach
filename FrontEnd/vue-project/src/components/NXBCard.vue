<script>
export default {
  props: {
    NXB: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Mã NXB:</strong>
      {{ NXB.MaNXB }}
    </div>
    <div class="p-1">
      <strong>Tên NXB:</strong>
      {{ NXB.TenNXB }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ NXB.diaChi }}
    </div>
  </div>
</template>
