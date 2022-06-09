const socketControl = (socket) => {
    socket.emit('get-orders', 'orders');
};

module.exports = socketControl;
