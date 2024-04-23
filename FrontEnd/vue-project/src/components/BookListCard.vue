<script>
export default {
  props: {
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
      console.log(this.activeIndex);
    },
  },
};
</script>
<template>
  <div class="book-list-card">
    <div
      class="card book-card"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <img
        class="card-img-top p-3"
        src="/image/hinh-nen-laptop-anime-min.jpg"
        alt="Card image"
      />
      <div class="card-body card-body-custom">
        <h4 class="card-title" style="justify-content: start">
          {{ book.bookName }}
        </h4>
        <div>
          <p class="card-text">{{ book.TacGia }}</p>

          <p class="card-text mb-2">Còn lại: {{ book.soQuyen }}</p>
          <p class="card-text mb-2">Giá mượn: {{ book.price }}đ</p>
        </div>

        <button type="button" class="btn btn-warning mt-2">Mượn</button>
      </div>
    </div>
  </div>
</template>
