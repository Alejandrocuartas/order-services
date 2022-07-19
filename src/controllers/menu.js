const { response, request } = require('express');

const {
    createMenu,
    deletMenu,
    createProduct,
    deletProduct,
    editProduct,
    getProducts,
} = require('../use-cases');

const getMenu = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const menu = await getProducts(companyId);
        res.status(200).json({
            menu,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Could not get menu.',
            error: error.message,
        });
    }
};

const getMenuClient = async (req = request, res = response) => {
    try {
        const { companyId } = req.params;
        const menu = await getProducts(companyId);
        res.status(200).json({
            menu,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Could not get menu.',
            error: error.message,
        });
    }
};

const postMenu = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const menu = await createMenu(companyId);
        res.status(200).json({
            message: 'Menu created correctly',
            menu,
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
        let imagePath = '';
        if(req.files){
            const { tempFilePath } = req.files.productImage;
            imagePath = tempFilePath
        }
        const { companyId } = req;
        const { name, price, description } = req.body;
        const products = await createProduct(companyId, imagePath, name, description, price);
        res.status(200).json({
            message: 'Product created correctly',
            products,
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
        const product = await editProduct(companyId, id, newPrice);
        res.status(200).json({
            message: 'product price updated correctly.',
            product,
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
    getMenu,
    getMenuClient,
};
