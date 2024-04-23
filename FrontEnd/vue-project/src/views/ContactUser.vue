<template>
  <AppHeader :user="user"></AppHeader>
  <div>
    <InputSearch v-model="searchText" />
  </div>

  <div class="row">
    <div class="mt-3">
      <h4>Sách có thể mượn</h4>
      <BookListCard
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      ></BookListCard>
      <p v-else>Hiện tại chưa có quyển sách nào để mượn</p>
    </div>

    <!-- <div class="mt-3 col-md-6">
      <div v-if="activeBook">
        <h4>Thông tin sách</h4>
        <BookCard :book="activeBook" />
        <router-link
          :to="{
            name: 'book.edit',
            params: { id: activeBook._id },
          }"
        >
          <span class="mt-2 badge badge-warning"> Chỉnh sửa </span>
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import bookService from "@/services/book.service";
import AppHeader from "@/components/AppHeader.vue";
import userService from "@/services/user.service";
import BookListCard from "@/components/BookListCard.vue";
export default {
  components: {
    BookCard,
    InputSearch,
    BookList,
    AppHeader,
    BookListCard,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
      user: null,
    };
  },
  watch: {
    //giam sat thay doi cua bien searchText
    //bo chon cac phan tu dan duoc chon trog danh sach
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    //chuyen cac doi tuong contact hanh chuoi de de tim kiem
    bookStrings() {
      return this.books.map((book) => {
        const { bookId, bookName, price, soQuyen, namXuatBan, MaNXB, TacGia } =
          book;
        console.log(book);
        return [
          bookId,
          bookName,
          price,
          soQuyen,
          namXuatBan,
          MaNXB,
          TacGia,
        ].join("");
      });
    },
    //tra ve cac contact co chua thong tin tim kiem
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) =>
        this.bookStrings[index].includes(this.searchText)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await bookService.findAllBook();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },
    async removeAllBooks() {
      if (confirm("Ban muon xoa tat ca Lien he???")) {
        try {
          await bookService.deleteAllBook();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddBook() {
      this.$router.push({ name: "book.add" });
    },
    async getUser(id) {
      this.user = await userService.findOneUser(id);
    },
  },
  mounted() {
    this.refreshList();
  },
  created() {
    this.getUser(this.id);
  },
};
</script>
