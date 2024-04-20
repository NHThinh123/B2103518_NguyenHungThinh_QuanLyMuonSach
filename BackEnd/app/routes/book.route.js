const express = require("express");
const books = require("../controllers/book.controller");
const users = require("../controllers/user.controller");
const NXBs = require("../controllers/NXB.controller");
const borrows = require("../controllers/borrow.controller");

const router = express.Router();
//router tìm sách
router
  .route("/book")
  .get(books.findAllBook)
  .post(books.createBook)
  .delete(books.deleteAllBook);

router.route("/favorite").get(books.findAllFavoriteBook);

router
  .route("/book/:id")
  .get(books.findOneBook)
  .put(books.updateBook)
  .delete(books.deleteBook);
//router tìm người dùng

router.route("/user").get(users.findAllUser).post(users.createUser);

router
  .route("/user/:id")
  .get(users.findOneUser)
  .put(users.updateUser)
  .delete(users.deleteUser);
//router tìm NXB
router.route("/NXB").get(NXBs.findAllNXB).post(NXBs.createNXB);

router
  .route("/NXB/:id")
  .get(NXBs.findOneNXB)
  .put(NXBs.updateNXB)
  .delete(NXBs.deleteNXB);
// router muon sach
router.route("/borrow/:id").get(borrows.findAllBorrow);

router
  .route("/borrow/:id1/:id2")
  .get(borrows.findOneBorrow)
  .put(borrows.updateBorrow)
  .delete(borrows.deleteBorrow)
  .post(borrows.createBorrow);

module.exports = router;
