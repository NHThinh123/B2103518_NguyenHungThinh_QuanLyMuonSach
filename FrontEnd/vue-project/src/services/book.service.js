import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api/bookManager") {
    this.api = createApiClient(baseUrl);
  }
  async findAllBook() {
    return (await this.api.get("/book")).data;
  }
  async createBook(data) {
    return (await this.api.post("/book", data)).data;
  }
  async deleteAllBook() {
    return (await this.api.delete("/book")).data;
  }
  async findOneBook(id) {
    return (await this.api.get(`/book/${id}`)).data;
  }
  async updateBook(id, data) {
    return (await this.api.put(`/book/${id}`, data)).data;
  }
  async deleteBook(id) {
    return (await this.api.delete(`/book/${id}`)).data;
  }
}
export default new BookService();
