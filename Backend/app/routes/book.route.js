const express = require("express");

const customer = require("../controllers/customer.controller");
const product =  require("../controllers/product.controller");
const order = require("../controllers/order.controller");
const router = express.Router();

router.route("/admin")
    .post(product.create)
    .delete(product.deleteAll)

router.route("/admin/:id")
    .put(product.update)
    .delete(product.delete)

router.route("/find")
    .get(product.findAll)

router.route("/find/:id")
    .get(product.findOne)

router.route("/customer")
    .post(customer.createCart)
router.route("/customer/:username")
    .get(customer.findUserCart)
    .put(customer.update)
    
router.route("/customer/:username/:productId")
    .delete(customer.deleteCart)

router.route("/register")
    .post(customer.createUser)

router.route("/login")
    .post(customer.login)

router.route("/order")
    .get(order.getAllOrder)
    .post(order.create)
router.route("/order/:username")
    .get(order.getUserOrder)
    .put(order.updateComfirmOrder)
router.route("/ordered/:orderId")
    .get(order.getOder)
    .put(order.update)


module.exports = router;
