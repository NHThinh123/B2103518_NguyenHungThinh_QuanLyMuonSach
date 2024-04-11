const express = require("express");
const books = require("../controllers/book.controller");

const router = express.Router();

router
  .route("/")
  .get(books.findAllBook)
  .post(books.createBook)
  .delete(books.deleteAllBook);

router.route("/favorite").get(books.findAllFavoriteBook);

router
  .route("/:id")
  .get(books.findOneBook)
  .put(books.updateBook)
  .delete(books.deleteBook);

module.exports = router;
