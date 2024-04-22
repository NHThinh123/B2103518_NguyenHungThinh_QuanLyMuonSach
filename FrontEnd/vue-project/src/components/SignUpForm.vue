<template>
  <Form @submit="submitUser" :validation-schema="userFormSchema">
    <div class="form-group">
      <label for="userId">Tên đăng nhập</label>
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
    <div class="form-group">
      <label for="userName">Họ tên</label>
      <Field
        name="userName"
        type="text"
        class="form-control"
        v-model="userLocal.userName"
      />
      <ErrorMessage name="userName" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ngaySinh">Ngày Sinh</label>
      <Field
        name="ngaySinh"
        type="date"
        class="form-control"
        v-model="userLocal.ngaySinh"
      />
      <ErrorMessage name="ngaySinh" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="soDienThoai">Số điện thoại</label>
      <Field
        name="soDienThoai"
        type="text"
        class="form-control"
        v-model="userLocal.soDienThoai"
      />
      <ErrorMessage name="soDienThoai" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="gioiTinh">Giới tính</label>
      <select name="gioiTinh" class="form-control" v-model="userLocal.gioiTinh">
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>
      <ErrorMessage name="gioiTinh" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="diaChi">Địa chỉ</label>
      <Field
        name="diaChi"
        type="text"
        class="form-control"
        v-model="userLocal.diaChi"
      />
      <ErrorMessage name="diaChi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary btn-block">Đăng Ký</button>
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
      userName: yup
        .string()
        .required("Tên không được bỏ trống")
        .min(3, "Tên tối thiểu 3 ký tự")
        .max(30, "Tên không quá 30 ký tự"),
      soDienThoai: yup
        .string()
        .required("Vui lòng điền số điện thoại")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      diaChi: yup
        .string()
        .required("Vui lòng điền địa chỉ")
        .min(5, "Địa chỉ tối thiểu 5 ký tự")
        .max(100, "Tên tác giả không quá 100 ký tự"),
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
