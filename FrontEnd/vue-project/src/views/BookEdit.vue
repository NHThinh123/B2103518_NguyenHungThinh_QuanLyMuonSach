<template>
  <div v-if="book" class="page">
    <h4>Chỉnh sửa</h4>
    <BookForm
      :book="book"
      :NXBs="NXBs"
      @submit:book="updateBook"
      @delete:book="deleteBook"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import bookService from "@/services/book.service";
import NXBService from "@/services/nxb.service";

export default {
  components: {
    BookForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      book: null,
      message: "",
      NXBs: [],
    };
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await bookService.findOneBook(id);
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
    async updateBook(data) {
      try {
        await bookService.updateBook(this.book._id, data);
        this.message = "Cập nhật thành công";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBook(data) {
      if (confirm("Ban muon xoa lien he nay?")) {
        try {
          await bookService.deleteBook(this.book._id);
          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getNXBs() {
      try {
        this.NXBs = await NXBService.findAllNXB();
        console.log(this.NXBs);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getBook(this.id);
    this.message = "";
    this.getNXBs();
  },
};
</script>
