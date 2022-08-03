const { getOrder } = require('../use-cases');
const { sessionHandler } = require('../helpers');

const socketControl = (socket) => {
    socket.on('get-orders', async (jwt, callback) => {
        try {
            const companyId = sessionHandler(jwt);
            const orders = await getOrder(companyId);
            callback({
                orders,
                error: false,
            });
        } catch (error) {
            callback({
                error: true,
                message: error.message,
                orders: [],
            });
        }
    });
    socket.on('get-deliveries', async (jwt, callback) => {
        try {
            const companyId = sessionHandler(jwt);
            const orders = await getOrder(companyId, true);
            callback({
                orders,
                error: false,
            });
        } catch (error) {
            callback({
                error: true,
                message: error.message,
                orders: [],
            });
        }
    });
    socket.on('new-delivery', (orders) => {
        socket.broadcast.emit('new-deliveries', orders);
    });
    socket.on('new-order', (orders) => {
        socket.broadcast.emit('new-orders', orders);
    });
};

module.exports = socketControl;
