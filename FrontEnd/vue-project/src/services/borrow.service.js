import createApiClient from "./api.service";

class BorrowService {
  constructor(baseUrl = "/api/bookManager") {
    this.api = createApiClient(baseUrl);
  }
  async findAllBorrow(userId) {
    return (await this.api.get(`/borrow/${userId}`)).data;
  }
  async createBorrow(userId, bookId, data) {
    return (await this.api.post(`/borrow/${userId}/${bookId}`, data)).data;
  }
  async findOneBorrow(userId, bookId) {
    return (await this.api.get(`/borrow/${userId}/${bookId}`)).data;
  }
  async updateBorrow(userId, bookId, data) {
    return (await this.api.put(`/borrow/${userId}/${bookId}`, data)).data;
  }
  async deleteBorrow(userId, bookId) {
    return (await this.api.delete(`/borrow/${userId}/${bookId}`)).data;
  }
}
export default new BorrowService();
