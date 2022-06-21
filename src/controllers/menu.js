const { response, request } = require('express');

const {
    createMenu,
    deletMenu,
    createProduct,
    deletProduct,
    editProduct,
} = require('../use-cases');

const postMenu = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        await createMenu(companyId);
        res.status(200).json({
            message: 'Menu created correctly',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not create menu',
            error: error.message,
        });
    }
};

const deleteMenu = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        await deletMenu(companyId);
        res.status(200).json({
            message: 'Menu deleted correctly',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not delete menu',
            error: error.message,
        });
    }
};

const postProduct = async (req = request, res = response) => {
    try {
        const { tempFilePath } = req.files.productImage;
        const { companyId } = req;
        const { name, price } = req.body;
        await createProduct(companyId, tempFilePath, name, price);
        res.status(200).json({
            message: 'Product created correctly',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not create product',
            error: error.message,
        });
    }
};

const deleteProduct = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const { id } = req.params;
        const products = await deletProduct(companyId, id);
        res.status(200).json({
            message: 'product deleted correctly.',
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not delete product',
            error: error.message,
        });
    }
};

const patchProduct = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const { id } = req.params;
        const { newPrice } = req.body;
        const products = await editProduct(companyId, id, newPrice);
        res.status(200).json({
            message: 'product price updated correctly.',
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Could not update product',
            error: error.message,
        });
    }
};

module.exports = {
    postMenu,
    deleteMenu,
    postProduct,
    deleteProduct,
    patchProduct,
};
