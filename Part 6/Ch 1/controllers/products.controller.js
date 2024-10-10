const productModel = require('../models/products.model');

async function createProduct(req, res, next) {
    try {
        console.log(req)
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
}

async function getProducts(req, res, next) {
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const product = await productModel.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        await productModel.findByIdAndDelete(req.params.productId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}