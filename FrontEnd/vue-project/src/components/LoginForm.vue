<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="form-group">
      <label for="bookId">Tên đăng nhập</label>
      <Field
        name="userId"
        type="text"
        class="form-control"
        v-model="userLocal.userId"
      />
      <ErrorMessage name="userId" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        v-model="userLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="d-grid">
      <button class="btn btn-primary btn-block mt-3">Đăng Nhập</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
      userId: yup
        .string()
        .required("Tên đăng nhập không được bỏ trống")
        .min(5, "Tên đăng nhập tối thiểu 5 ký tự")
        .max(30, "tên đăng nhập không quá 30 ký tự"),
      password: yup
        .string()
        .required("Không được để trống mật khẩu")
        .min(5, "Độ dài mật khẩu không quá 5-16 ký tự")
        .max(16, "Độ dài mật khẩu không quá 5-16 ký tự"),
    });
    return {
      // chung ta khong muon hieu chinh props, nen tao bien cuc Bo
      //contacLocal de lien ket voi cac input trong form
      userLocal: this.user,
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
