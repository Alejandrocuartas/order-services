const { getOrder } = require('../use-cases');
const { sessionHandler } = require('../helpers');

const socketControl = (socket) => {
    socket.on('get-orders', async (jwt) => {
        try {
            const companyId = sessionHandler(jwt);
            const orders = await getOrder(companyId);
            socket.emit('orders', {
                orders,
            });
        } catch (error) {
            socket.emit('orders', null);
        }
    });
};

module.exports = socketControl;
