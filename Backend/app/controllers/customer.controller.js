const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const CustomerService = require("../services/customer.service");

exports.createUser = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const existUser = await customerService.findOneUser(req.body.username);
        
        if (existUser) {
            return next(
                new ApiError(400, "The username exist")
            );
        }
        else {
            const document = await customerService.createUser(req.body);
            return res.send(document);
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

exports.createCart = async (req, res, next) => {
    try {

        const customerService = new CustomerService(MongoDB.client);
        const existCart = await customerService.findOneCart(req.body.username, req.body._id);
        
        if (existCart) {
            existCart.quantity += req.body.quantity;
            const document = await customerService.updateCart(existCart.username, existCart);
            return res.send(document);
        }
        else {
            const document = await customerService.createCart(req.body);

            return res.send(document);
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the cart")
        );
    }
}

exports.findUserCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const documents = await customerService.findUser(req.params.username);
        if (!documents) {
            return next(new ApiError(404, "Cart not found"));
        }
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while find all cart")
        );
    }
}



exports.deleteCart = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.deleteCart(req.params.username, req.params.productId);
        if (!document) {
            return next(new ApiError(404, 'Cart not found'));
        }
        return res.send({ message: "Cart was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the cart")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.updateCart(req.params.username, req.body);
        res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while updating the cart")
        );
    }
}

exports.login = async (req, res, next) => {
    try {
        console.log(req.body);
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.login(req.body.username, req.body.password);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while login")
        )
    }
}
