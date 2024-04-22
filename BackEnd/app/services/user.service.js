const { ObjectId } = require("mongodb");

class UserService {
  constructor(client) {
    this.User = client.db().collection("KhoNguoiDung");
  }
  //dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
  extractUserData(payload) {
    const user = {
      userId: payload.userId,
      password: payload.password,
      userName: payload.userName,
      ngaySinh: payload.ngaySinh,
      gioiTinh: payload.gioiTinh,
      diaChi: payload.diaChi,
      soDienThoai: payload.soDienThoai,
      laNhanVien: payload.laNhanVien,
    };
    //remove undefined fields
    //kiem tra co s o object voi key
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async create(payload) {
    const user = this.extractUserData(payload);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { laNhanVien: user.laNhanVien === true } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractUserData(payload);
    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }
  async delete(id) {
    const result = await this.User.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  // async findFavorite(){
  //     const result= await this.contact.find({favorite: true}).toArray();
  //     return result;
  // }

  // async deleteAll(){
  //     const result = await this.contact.deleteMany({});
  //     //la deleted chu kho phai delete
  //     return result.deletedCount;
  // }
}

module.exports = UserService;
