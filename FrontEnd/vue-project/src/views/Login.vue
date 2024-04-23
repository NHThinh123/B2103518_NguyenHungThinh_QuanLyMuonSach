<template>
  <div class="page">
    <h4 class="mt-4">Đăng Nhập</h4>
    <LoginForm :user="user" @submit:user="checkUser" />
    <div class="d-grid mt-3">
      <button class="btn btn-outline-primary btn-block" @click="goToSignUp">
        Đăng Ký
      </button>
    </div>
    <p class="text-danger">{{ message }}</p>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    LoginForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: {
        userId: "",
        password: "",
      },
      listUser: [],
      message: "",
    };
  },
  methods: {
    async getListUser() {
      this.listUser = await UserService.findAllUser();
    },
    async checkUser() {
      let confirm = 0;
      let iUser = -1;
      for (let i = 0; i <= this.listUser.length; i++) {
        if (
          this.listUser[i].userId == this.user.userId &&
          this.listUser[i].password == this.user.password
        ) {
          confirm = 1;
          iUser = i;
          this.message = "đăng nhập thành công";
          if (this.listUser[iUser].laNhanVien) {
            await this.$router.push({
              name: "contactbook",
              params: {
                id: this.listUser[iUser]._id,
              },
            });
          } else {
            await this.$router.push({
              name: "contactuser",
              params: {
                id: this.listUser[iUser]._id,
              },
            });
          }
        } else {
          this.message = "Đăng nhập thất bại";
        }
      }
    },
    goToSignUp() {
      this.$router.push({ name: "signup" });
    },
  },
  created() {
    this.getListUser();
  },
};
</script>
