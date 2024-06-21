import createApiClient from "./api.service";
class ProductService {
    constructor(baseUrl = "/api/datas") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/find")).data;
    }
    async getByName(name) {
        return (await this.api.get("/find?name=" + name)).data;
    }
    async get(id) {
        return (await this.api.get(`/find/${id}`)).data;
    }
    async getByPublisher(dt) {
        return (await this.api.get(`/findb?publisher=${dt}`)).data;
    }
}
export default new ProductService()