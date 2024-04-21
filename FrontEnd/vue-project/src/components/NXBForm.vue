<template>
  <Form @submit="submitNXB" :validation-schema="NXBFormSchema">
    <div class="form-group">
      <label for="MaNXB">Mã NXB</label>
      <Field
        name="MaNXB"
        type="text"
        class="form-control"
        v-model="NXBLocal.MaNXB"
      />
      <ErrorMessage name="MaNXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TenNXB">Tên NXB</label>
      <Field
        name="TenNXB"
        type="text"
        class="form-control"
        v-model="NXBLocal.TenNXB"
      />
      <ErrorMessage name="TenNXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="diaChi">Địa Chỉ</label>
      <Field
        name="diaChi"
        type="text"
        class="form-control"
        v-model="NXBLocal.diaChi"
      />
      <ErrorMessage name="diaChi" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="NXBLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteNXB"
      >
        Xóa
      </button>
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
  emits: ["submit:NXB", "delete:NXB"],
  props: {
    NXB: { type: Object, required: true },
  },
  data() {
    const NXBFormSchema = yup.object().shape({
      MaNXB: yup
        .string()
        .matches(/((NXB)+([0-9]{3})\b)/, "Mã NXB không hợp lệ"),
      TenNXB: yup
        .string()
        .required("Tên NXB phải có giá trị")
        .min(5, "Tên NXB tối thiểu 5 ký tự")
        .max(50, "Tên NXB không quá 50 ký tự"),
      diaChi: yup
        .string()
        .required("không được để trống địa chỉ")
        .min(5, "Địa chỉ tối thiểu 5 ký tự")
        .max(100, "Địa chỉ không quá 100 ký tự"),
    });
    return {
      // chung ta khong muon hieu chinh props, nen tao bien cuc Bo
      //contacLocal de lien ket voi cac input trong form
      NXBLocal: this.NXB,
      NXBFormSchema,
    };
  },
  methods: {
    submitNXB() {
      this.$emit("submit:NXB", this.NXBLocal);
    },
    deleteNXB() {
      this.$emit("delete:NXB", this.NXBLocal.id);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
