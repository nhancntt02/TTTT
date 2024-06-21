const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ProductService = require("../services/product.service");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Khong co ten sach"));
    } 

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the Product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const productService = new ProductService(MongoDB.client);
        const { tensach } = req.query;
        if (tensach) {
            documents = await productService.findByName(tensach);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving  Product")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};



exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);

        if(!document) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.send({message: "Product was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500,  `Error  updating Product with id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete Product with id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deleteCount = await productService.deleteAll();
        return res.send({
            message : `${deleteCount} contacts were deleted`
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all Products")
        );
    }
};

 
