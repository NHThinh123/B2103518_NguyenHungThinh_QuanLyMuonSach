const { ObjectId } = require("mongodb");

class NXBService {
  constructor(client) {
    this.NXB = client.db().collection("KhoNXB");
  }
  //dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
  extractNXBData(payload) {
    const nxb = {
      MaNXB: payload.MaNXB,
      TenNXB: payload.TenNXB,
      diaChi: payload.diaChi,
    };
    //remove undefined fields
    //kiem tra co s o object voi key
    Object.keys(nxb).forEach(
      (key) => nxb[key] === undefined && delete nxb[key]
    );
    return nxb;
  }

  async create(payload) {
    const nxb = this.extractNXBData(payload);
    const result = await this.NXB.findOneAndUpdate(
      nxb,
      { $set: {} },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.NXB.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.NXB.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractNXBData(payload);
    const result = await this.NXB.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }
  async delete(id) {
    const result = await this.NXB.findOneAndDelete({
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

module.exports = NXBService;
