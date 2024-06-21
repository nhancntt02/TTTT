const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const OrderService = require("../services/order.service");

exports.create = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
}

exports.getAllOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const documents = await orderService.getAllOrder();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while get all")
        );
    }
}

exports.getUserOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const documents = await orderService.getUserOrder(req.params.username);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while get user ")
        );
    }
}

exports.getOder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const documents = await orderService.getOrder(req.params.orderId);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while get cart")
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.orderId);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while update ")
        );
    }
}

exports.updateComfirmOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.updateComfirmOrder(req.params.username, req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while update ")
        );
    }
}