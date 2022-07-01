const { request, response } = require('express');

const { createOrder, payOrder } = require('../use-cases');

const postOrder = async (req = request, res = response) => {
    try {
        const { companyId } = req.body;
        const { products, table } = req.body;
        let totalPrice = 0;
        if (products[0].price) {
            const prices = products.map((product) => product.price * product.amount);
            totalPrice = prices.reduce((a, b) => a + b, 0);
        }
        const productsList = products.map((product) => ({
            name: product.name,
            amount: product.amount,
        }));
        const { created, orders } = await createOrder(companyId, {
            table,
            products: productsList,
            price: totalPrice,
        });
        if (created) {
            return res.json({
                message: 'Order created.',
                orders,
            });
        }
        throw new Error('Unexpected error.');
    } catch (error) {
        return res.status(500).json({
            message: 'Could not create order',
            error: error.message,
        });
    }
};

const paidOrder = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const { orderId } = req.body;
        const orders = await payOrder(companyId, orderId);
        return res.status(200).json({
            message: 'Order deleted',
            orders,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Could not delete order',
            error: error.message,
        });
    }
};

module.exports = {
    postOrder,
    paidOrder,
};
