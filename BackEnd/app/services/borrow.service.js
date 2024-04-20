const { ObjectId } = require("mongodb");

class BorrowService {
  constructor(client) {
    this.Borrow = client.db().collection("KhoMuon");
  }
  //dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
  extractBorrowData(payload) {
    const borrow = {
      borrowId: payload.borrowId,
      borrowName: payload.borrowName,
      userId: payload.userId,
      bookId: payload.bookId,
      ngayMuon: payload.ngayMuon,
      ngayTra: payload.ngayTra,
    };
    //remove undefined fields
    //kiem tra co s o object voi key
    Object.keys(borrow).forEach(
      (key) => borrow[key] === undefined && delete borrow[key]
    );
    return borrow;
  }

  async create(userId, bookId, payload) {
    const query = { userId: userId, bookId: bookId };
    const borrow = this.extractBorrowData(payload);
    const result = await this.Borrow.findOneAndUpdate(
      borrow,
      { $set: { userId: query.userId, bookId: query.bookId } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(userId) {
    const query = { userId: userId };
    const cursor = await this.Borrow.find({ userId: query.userId });
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(userId, bookId) {
    const query = { userId: userId, bookId: bookId };
    return await this.Borrow.findOne(query);
  }

  async update(userId, bookId, payload) {
    const query = { userId: userId, bookId: bookId };

    const update = this.extractBorrowData(payload);
    const result = await this.Borrow.findOneAndUpdate(
      query,
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }
  async delete(userId, bookId) {
    const query = { userId: userId, bookId: bookId };
    const result = await this.Borrow.findOneAndDelete(query);
    return result;
  }
}

module.exports = BorrowService;
