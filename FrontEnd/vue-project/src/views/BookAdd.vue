<template>
  <div v-if="book" class="page">
    <h4>Thêm sách mới</h4>
    <BookForm :book="book" @submit:book="createBook" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import bookService from "@/services/book.service";

export default {
  components: {
    BookForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      book: {
        bookId: "",
        bookName: "",
        price: "",
        soQuyen: "",
        namXuatBan: "",
        MaNXB: "",
        TacGia: "",
      },
      message: "",
    };
  },
  methods: {
    async createBook(data) {
      try {
        await bookService.createBook(data);
        this.message = "Thêm thành công";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
