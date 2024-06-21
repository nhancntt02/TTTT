const { ObjectId } = require("mongodb");
const CryptoJS = require('crypto-js');
class CustomerService {
    constructor(client) {
        this.Customer = client.db().collection("customer");
    }
    extractCustomerData(payload) {

        const customer = {
            username: payload.username,
            password: payload.password,
            productId: payload._id,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,
            name: payload.name

        };
        return customer;
    }

    async createUser(payload) {
        
        const customer = this.extractCustomerData(payload);
        const result = await this.Customer.insertOne(
            customer,
            { returnDocument: "after", upsert: true }
        );
        return true;

    }

    async createCart(payload) {
        const cart = this.extractCustomerData(payload);
        if(cart.username == null){
            cart.username = "guest";
        }
        const rs = await this.Customer.insertOne(cart);
        return "Tao gio hang thanh cong";
    }

    async findUser(username) {
        const cursor = await this.Customer.find({ username: username });
        return await cursor.toArray();
    }
    async findOneUser(username) {
        const result = await this.Customer.findOne({ username: username });
        return result;
    }
    async findOneCart(username, productId) {
        const usernameC = username ? username : "guest";
        console.log(usernameC);
        const filter = {
            username: usernameC,
            productId: productId
        };
        const rs = await this.Customer.findOne(filter);
        console.log(rs);
        return rs;
    }
    async updateCart(username, payload) {
        const filter = {
            username: username,
            productId: payload.productId
            
        };
        const update = { quantity: payload.quantity};

        const result = await this.Customer.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async deleteCart(username, productId) {
        const filter = {
            username: username,
            productId: productId
        };
        const result = await this.Customer.deleteOne(filter);
        ;
        return result;
    }

    async login(username, password) {
        const result = await this.Customer.findOne({ username: username, password: password });
        if(result) {
            const carts = await this.findUser("guest");
            console.log(carts.length);
            for(let i = 0; i < carts.length; i++ ){
                const update = {
                    username: username,
                    password: password
                };
                await this.Customer.findOneAndUpdate(
                    carts[i],
                    { $set: update },
                    { returnDocument: "after" }
                );  
            }
            return true;
        } else {
            return false;
        }
    }
}
module.exports = CustomerService;
