<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ book.bookId }}
    </div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ book.bookName }}
    </div>
    <div class="p-1">
      <strong>Giá tiền:</strong>
      {{ book.price }}
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ book.soQuyen }}
    </div>
    <div class="p-1">
      <strong>Năm xuất bản:</strong>
      {{ book.namXuatBan }}
    </div>
    <div class="p-1">
      <strong>Nhà Xuất bản:</strong>
      {{ book.MaNXB }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ book.TacGia }}
    </div>
  </div>
</template>
