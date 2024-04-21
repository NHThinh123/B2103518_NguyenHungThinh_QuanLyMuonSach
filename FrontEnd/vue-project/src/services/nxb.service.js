import createApiClient from "./api.service";

class NXBService {
  constructor(baseUrl = "/api/bookManager") {
    this.api = createApiClient(baseUrl);
  }
  async findAllNXB() {
    return (await this.api.get("/NXB")).data;
  }
  async createNXB(data) {
    return (await this.api.post("/NXB", data)).data;
  }
  async deleteAllNXB() {
    return (await this.api.delete("/NXB")).data;
  }
  async findOneNXB(id) {
    return (await this.api.get(`/NXB/${id}`)).data;
  }
  async updateNXB(id, data) {
    return (await this.api.put(`/NXB/${id}`, data)).data;
  }
  async deleteNXB(id) {
    return (await this.api.delete(`/NXB/${id}`)).data;
  }
}
export default new NXBService();
