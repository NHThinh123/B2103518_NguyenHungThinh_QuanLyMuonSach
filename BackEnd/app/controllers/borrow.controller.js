const BorrowService = require("../services/borrow.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//

//
exports.createBorrow = async (req, res, next) => {
  if (!req.body?.borrowId) {
    return next(new ApiError(400, "Không được để trống mã "));
  }

  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.create(
      req.params.id1,
      req.params.id2,
      req.body
    );
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xuất hiện khi tạo borrow mới"));
  }
};
exports.findAllBorrow = async (req, res, next) => {
  let documents = [];

  try {
    const borrowService = new BorrowService(MongoDB.client);
    const { borrowName } = req.query;
    if (borrowName) {
      documents = await borrowService.findByName(borrowName);
    } else {
      documents = await borrowService.find(req.params.id);
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi khi tìm"));
  }

  return res.send(documents);
};
exports.findOneBorrow = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.findById(
      req.params.id1,
      req.params.id2
    );
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xải ra khi tìm người dùng có id=${req.params.id1} và sách id=${req.params.id2}`
      )
    );
  }
};
exports.updateBorrow = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu bị trống"));
  }

  try {
    const borowService = new BorrowService(MongoDB.client);
    const document = await borowService.update(
      req.params.id1,
      req.params.id2,
      req.body
    );
    if (!document) {
      return next(
        new ApiError(
          404,
          `không tìm thấy người dùng có id= ${req.params.id1} và sản phẩm id=${req.params.id2}`
        )
      );
    }
    return res.send({ message: "Cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `có lỗi khi cập nhật người dùng có id=${req.params.id1} và sản phẩm id=${req.params.id2}`
      )
    );
  }
};
exports.deleteBorrow = async (req, res, next) => {
  try {
    const borrowService = new BorrowService(MongoDB.client);
    const document = await borrowService.delete(req.params.id1, req.params.id2);
    if (!document) {
      return next(new ApiError(404, "không tìm thấy"));
    }
    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    new ApiError(
      500,
      `có lỗi khi xóa người dùng có id=${req.params.id1} và sản phẩm id=${req.params.id2}`
    );
  }
};
