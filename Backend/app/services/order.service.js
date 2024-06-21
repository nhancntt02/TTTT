
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("order");
    }

    extractOrderData(payload) {
        const order = {
            orderId: payload.orderId,
            username: payload.username,
            productId: payload.productId,
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,
            status: "Chờ xác nhận",
            total: payload.total,
            payment: payload.payment,
            date: payload.date,
            realname: payload.realname,
            address: payload.address,
            numberPhone: payload.numberPhone,
        }

        return order;
    }

    async getAllOrder() {
        return await this.Order.find({}).toArray();
    }

    async getUserOrder(username) {
        return await this.Order.find({ username: username }).toArray();
    }

    async getOrder(orderId) {
        return await this.Order.find({orderId: orderId}).toArray();
    }

    async create(payload) {
        const order = this.extractOrderData(payload);
        const result = await this.Order.insertOne(order);
        return result.insertedId;
    }

    async update(orderId) {
        const result = await this.getOrder(orderId);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].status === "Chờ xác nhận") {
                    const update = { status: "Đã xác nhận" };
                    await this.Order.findOneAndUpdate(
                        result[i],
                        { $set: update }
                    );
                
                } else if (result[i].status === "Đã xác nhận") {
                    const update = { status: "Đang vận chuyển" };
                    await this.Order.findOneAndUpdate(
                        result[i],
                        { $set: update }
                    );
                } else if (result[i].status === "Đang vận chuyển") {
                    const update = { status: "Đã nhận hàng" };
                    await this.Order.findOneAndUpdate(
                        result[i],
                        { $set: update }
                    );
                } else {
                    return "Loi update"
                }
            }
        } else {
            return "Khong co don hang nay";
        }
    }

    async updateComfirmOrder(username, payload) {
        const result = await this.getUserOrder(username);
        if(result.length > 0) {
            result.forEach(async order => {
                await this.Order.findOneAndUpdate(
                    order,
                    {$set: payload}
                );
            });
        }else {
            return "Khong co don hang nay";
        }
    }

}
module.exports = OrderService;