const NXBService = require("../services/NXB.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//

//
exports.createNXB = async (req, res, next) => {
  if (!req.body?.MaNXB) {
    return next(new ApiError(400, "Không được để trống mã NXB"));
  }

  try {
    const nxbService = new NXBService(MongoDB.client);
    const document = await nxbService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Có lỗi xuất hiện khi tạo 1 NXB mới"));
  }
};
exports.findAllNXB = async (req, res, next) => {
  let documents = [];

  try {
    const nxbService = new NXBService(MongoDB.client);
    const { TenNXB } = req.query;
    if (TenNXB) {
      documents = await nxbService.findByName(TenNXB);
    } else {
      documents = await nxbService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Có lỗi khi tìm"));
  }

  return res.send(documents);
};
exports.findOneNXB = async (req, res, next) => {
  try {
    const nxbService = new NXBService(MongoDB.client);
    const document = await nxbService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Có lỗi xải ra khi tìm NXB có id=${req.params.id}`)
    );
  }
};
exports.updateNXB = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu bị trống"));
  }

  try {
    const nxbService = new NXBService(MongoDB.client);
    const document = await nxbService.update(req.params.id, req.body);
    if (!document) {
      return next(
        new ApiError(404, `không tìm thấy NXB có id= ${req.params.id}`)
      );
    }
    return res.send({ message: "Cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `có lỗi khi cập nhật NXB có id=${req.params.id}`)
    );
  }
};
exports.deleteNXB = async (req, res, next) => {
  try {
    const nxbService = new NXBService(MongoDB.client);
    const document = await nxbService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "không tìm thấy"));
    }
    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    new ApiError(500, `Có lỗi khi xóa NXB có id=${req.params.id}`);
  }
};
