const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
//

//
exports.createBook = async (req, res, next) => {
  if (!req.body?.MASACH) {
    return next(new ApiError(400, "Không được để trống mã sách"));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xuất hiện khi tạo 1 sách mới"));
  }
  //   res.send({ message: "tạo sách" });
};
exports.findAllBook = async (req, res, next) => {
  let documents = [];

  try {
    const bookService = new BookService(MongoDB.client);
    const { bookName } = req.query;
    if (bookName) {
      documents = await bookService.findByName(bookName);
    } else {
      documents = await bookService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi khi tìm sách"));
  }

  return res.send(documents);
  //   res.send({ message: "kiếm toàn bộ sách" });
};
exports.findOneBook = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xải ra khi tìm quyển sách có id=${req.params.id}`
      )
    );
  }
  //   res.send({ message: "tìm 1 quyển sách" });
};
exports.updateBook = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu bị trống"));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.update(req.params.id, req.body);
    if (!document) {
      return next(
        new ApiError(404, `không tìm thấy sách có id= ${req.params.id}`)
      );
    }
    return res.send({ message: "Cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `có lỗi khi cập nhật sách có id=${req.params.id}`)
    );
  }
  //   res.send({ message: "chỉnh sửa lại quyển sách" });
};
exports.deleteBook = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "không tìm thấy sách"));
    }
    return res.send({ message: "Xóa sách thành công" });
  } catch (error) {
    new ApiError(500, `Có lỗi khi xóa sách có id=${req.params.id}`);
  }
  //   res.send({ message: "xóa sách" });
};
exports.deleteAllBook = async (req, res, next) => {
  //   try {
  //     const contactService = new ContactService(MongoDB.client);
  //     const deleteCount = await contactService.deleteAll();
  //     return res.send({
  //       message: `${deleteCount} contacts were deleted successfully`,
  //     });
  //   } catch {
  //     return next(
  //       new ApiError(500, "An error occurred while removing all contacts")
  //     );
  //   }
  res.send({ message: "xóa toàn bộ sách" });
};
exports.findAllFavoriteBook = async (req, res, next) => {
  //   try {
  //     const contactService = new ContactService(MongoDB.client);
  //     const documents = await contactService.findFavorite();
  //     return res.send(documents);
  //   } catch (error) {
  //     return next(
  //       new ApiError(500, "An erro occurred while retrieving favorite contacts")
  //     );
  //   }
  res.send({ message: "tìm sách yêu thích" });
};
