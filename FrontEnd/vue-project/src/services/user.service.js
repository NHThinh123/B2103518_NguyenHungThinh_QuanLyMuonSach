import createApiClient from "./api.service";

class UserService {
  constructor(baseUrl = "/api/bookManager") {
    this.api = createApiClient(baseUrl);
  }
  async findAllUser() {
    return (await this.api.get("/user")).data;
  }
  async createUser(data) {
    return (await this.api.post("/user", data)).data;
  }
  async findOneUser(id) {
    return (await this.api.get(`/user/${id}`)).data;
  }
  async updateUser(id, data) {
    return (await this.api.put(`/user/${id}`, data)).data;
  }
  async deleteUser(id) {
    return (await this.api.delete(`/user/${id}`)).data;
  }
}
export default new UserService();
