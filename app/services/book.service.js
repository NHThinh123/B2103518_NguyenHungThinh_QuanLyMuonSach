const { ObjectId } = require("mongodb");

class BookService {
  constructor(client) {
    this.Book = client.db().collection("KhoSach");
  }
  //dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
  extractBookData(payload) {
    const book = {
      MASACH: payload.MASACH,
      TENSACH: payload.TENSACH,
      DONGIA: payload.DONGIA,
      SOQUYEN: payload.SOQUYEN,
      NAMXUATBAN: payload.NAMXUATBAN,
      MANHAXUATBAN: payload.MANHAXUATBAN,
      TACGIA: payload.TACGIA,
    };
    //remove undefined fields
    //kiem tra co s o object voi key
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
    return book;
  }

  async create(payload) {
    const book = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      book,
      { $set: { MANHAXUATBAN: book.MANHAXUATBAN } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Book.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }
  async delete(id) {
    const result = await this.Book.findOneAndDelete({
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

module.exports = BookService;
