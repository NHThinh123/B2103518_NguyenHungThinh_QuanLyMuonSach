const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//

//
exports.createUser = async (req, res, next) => {
  if (!req.body?.userId) {
    return next(new ApiError(400, "Không được để trống mã người dùng"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xuất hiện khi tạo 1 người dùng mới"));
  }
};
exports.findAllUser = async (req, res, next) => {
  let documents = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { userName } = req.query;
    if (userName) {
      documents = await userService.findByName(userName);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi khi tìm"));
  }

  return res.send(documents);
};
exports.findOneUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Có lỗi xải ra khi tìm người dùng có id=${req.params.id}`
      )
    );
  }
};
exports.updateUser = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu bị trống"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.update(req.params.id, req.body);
    if (!document) {
      return next(
        new ApiError(404, `không tìm thấy người dùng có id= ${req.params.id}`)
      );
    }
    return res.send({ message: "Cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `có lỗi khi cập nhật người dùng có id=${req.params.id}`)
    );
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "không tìm thấy"));
    }
    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    new ApiError(500, `Có lỗi khi xóa người dùng có id=${req.params.id}`);
  }
};
