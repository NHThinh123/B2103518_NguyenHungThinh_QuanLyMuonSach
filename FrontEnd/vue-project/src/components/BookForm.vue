<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="bookId">Mã sách</label>
      <Field
        name="bookId"
        type="text"
        class="form-control"
        v-model="bookLocal.bookId"
      />
      <ErrorMessage name="bookId" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="bookName">Tên Sách</label>
      <Field
        name="bookName"
        type="email"
        class="form-control"
        v-model="bookLocal.bookName"
      />
      <ErrorMessage name="bookName" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Giá tiền</label>
      <Field
        name="price"
        type="text"
        class="form-control"
        v-model="bookLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="soQuyen">Số quyển</label>
      <Field
        name="soQuyen"
        type="number"
        class="form-control"
        v-model="bookLocal.soQuyen"
      />
      <ErrorMessage name="soQuyen" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="namXuatBan">Năm xuất bản</label>
      <Field
        name="namXuatBan"
        type="number"
        class="form-control"
        v-model="bookLocal.namXuatBan"
      />
      <ErrorMessage name="namXuatBan" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="MaNXB">Mã nhà xuất bản</label>
      <select name="MaNXB" class="form-control" v-model="bookLocal.MaNXB">
        <option v-for="NXB in NXBs" :value="NXB.MaNXB" :key="NXB._id">
          {{ NXB.MaNXB }}
        </option>
      </select>
      <ErrorMessage name="MaNXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TacGia">Tác Giả</label>
      <Field
        name="TacGia"
        type="text"
        class="form-control"
        v-model="bookLocal.TacGia"
      />
      <ErrorMessage name="TacGia" class="error-feedback" />
    </div>
    <!-- <div class="form-group form-check">
        <input
          name="favorite"
          type="checkbox"
          class="form-check-input"
          v-model="contactLocal.favorite"
        />
        <label for="favorite" class="form-check-label">
          <strong>Lien he yeu thich</strong>
        </label>
      </div> -->
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBook"
      >
        Xoa
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
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
    NXBs: { type: Array, default: [] },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      bookId: yup
        .string()
        .matches(/((BOOK)+([0-9]{3})\b)/, "Mã sách không hợp lệ"),
      bookName: yup
        .string()
        .required("Tên sách phải có giá trị")
        .min(5, "Tên sách tối thiểu 5 ký tự")
        .max(50, "Tên sách không quá 50 ký tự"),
      price: yup
        .string()
        .required("không được để trống giá")
        .min(4, " giá tối thiểu là 1000"),
      soQuyen: yup
        .number()
        .required("Số quyển sách là bắt buộc")
        .positive("Số quyển sách phải lớn hơn 0")
        .integer("Số quyển sách phải là một số nguyên"),
      namXuatBan: yup
        .number()
        .required("Năm xuất bản không được bỏ trống")
        .positive("Năm xuất bản lớn hơn không"),

      TacGia: yup
        .string()
        .required("Tên tắc giả phải có giá trị")
        .min(5, "Tên tác giả tối thiểu 5 ký tự")
        .max(50, "Tên tác giả không quá 50 ký tự"),
    });
    return {
      // chung ta khong muon hieu chinh props, nen tao bien cuc Bo
      //contacLocal de lien ket voi cac input trong form
      bookLocal: this.book,
      bookFormSchema,
    };
  },
  methods: {
    submitBook() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      // this.$emit("delete:book", this.bookLocal.id);
      console.log(this.NXBs);
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
