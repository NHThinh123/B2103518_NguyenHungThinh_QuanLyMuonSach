<template>
  <div v-if="user" class="page">
    <h4 class="mt-4">Đăng Ký</h4>
    <SignUpForm :user="user" @submit:user="createUser" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    SignUpForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: {
        userId: "",
        password: "",
        userName: "",
        ngaySinh: "",
        gioiTinh: "",
        diaChi: "",
        soDienThoai: "",
        laNhanVien: false,
      },
      message: "",
    };
  },
  methods: {
    async createUser(data) {
      try {
        await UserService.createUser(data);
        this.message = "Thêm thành công";
        this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
