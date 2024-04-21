<template>
  <div v-if="NXB" class="page">
    <h4>Thêm NXB mới</h4>
    <NXBForm :NXB="NXB" @submit:NXB="createNXB" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NXBForm from "@/components/NXBForm.vue";
import NXBService from "@/services/nxb.service";

export default {
  components: {
    NXBForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      NXB: {
        MaNXB: "",
        TenNXB: "",
        diaChi: "",
      },
      message: "",
    };
  },
  methods: {
    async createNXB(data) {
      try {
        await NXBService.createNXB(data);
        this.message = "Thêm thành công";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
