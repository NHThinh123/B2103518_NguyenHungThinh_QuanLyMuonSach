<template>
  <div v-if="NXB" class="page">
    <h4>Chỉnh sửa</h4>
    <NXBForm :NXB="NXB" @submit:NXB="updateNXB" @delete:NXB="deleteNXB" />
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
      NXB: null,
      message: "",
    };
  },
  methods: {
    async getNXB(id) {
      try {
        this.NXB = await NXBService.findOneNXB(id);
      } catch (error) {
        console.log(error);
        //chuyen sang trang notfound nhung url ko doi
        this.$router.push({
          name: "notFound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateNXB(data) {
      try {
        await NXBService.updateNXB(this.NXB._id, data);
        this.message = "Cập nhật thành công";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNXB(data) {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await NXBService.deleteNXB(this.NXB._id);
          this.$router.push({ name: "contactNXB" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getNXB(this.id);
    this.message = "";
  },
};
</script>
