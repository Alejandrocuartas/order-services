const { getOrder } = require('../use-cases');
const { sessionHandler } = require('../helpers');

const socketControl = (socket) => {
    socket.on('get-orders', async (jwt, callback) => {
        try {
            const companyId = sessionHandler(jwt);
            const orders = await getOrder(companyId);
            callback({
                orders,
                error: false
            })
        } catch (error) {
            callback({
                error: true,
                message: error.message
            })
        }
    });
};

module.exports = socketControl;
