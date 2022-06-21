const googleAuth = require('./auth/googleAuth');
const saveTable = require('./table/saveTable');
const getTablesList = require('./table/getTables');
const deleteTable = require('./table/deleteTable');
const deleteGoogleLogin = require('./auth/deleteGoogleAuth');
const createMenu = require('./menu/createMenu');
const deletMenu = require('./menu/deleteMenu');
const createProduct = require('./menu/createProduct');
const deletProduct = require('./menu/deleteProduct');
const editProduct = require('./menu/editProduct');
const existingProduct = require('./middlewares/existProduct');
const existingTable = require('./middlewares/existTable');
const createOrder = require('./order/createOrder');
const getOrder = require('./order/getOrder');
const payOrder = require('./order/payOrder');

module.exports = {
    googleAuth,
    saveTable,
    getTablesList,
    deleteTable,
    deleteGoogleLogin,
    createMenu,
    deletMenu,
    createProduct,
    deletProduct,
    editProduct,
    existingProduct,
    existingTable,
    createOrder,
    getOrder,
    payOrder,
};
