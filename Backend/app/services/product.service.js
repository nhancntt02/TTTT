const { ObjectId } = require("mongodb");
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(payload) {
        const product = {
            _id: payload._id,
            name: payload.name,
            image: payload.image,
            description: payload.description,
            price: payload.price,
            quantity: payload.quantity,
            properties: payload.properties,
            publisher: payload.publisher,
            category: payload.category,
            rate: payload.rate,
        };
        return product;
    }

    async create(payload) {
            const book = this.extractProductData(payload);
            const result = await this.Product.insertOne(
                book,
                { returnDocument: "after", upsert: true },
            );
            return "Them san pham thanh cong";
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
            return await cursor.toArray();
        }

    // async findByName(tenSach) {
    //     return await this.Product.find({
    //         tensach: { $regex: new RegExp(tenSach), $options: "i" },
    //     }).toArray();
    // }

    async findById(id) {
        return await this.Product.findOne({
            _id: id
        });
    }
    async update(id, payload) {
        const filter = {
            _id: id,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: id,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ProductService;
