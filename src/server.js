const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { dbConnector } = require('./data-access');
const socketControl = require('./socket-control');
const { orderRouter, companyRouter, authRouter } = require('./routes');

class ServerModel {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = new Server(this.server);

        this.dbConnector();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async dbConnector() {
        await dbConnector();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors({
            credentials: true,
        }));
    }

    sockets() {
        this.io.on('connection', socketControl);
    }

    routes() {
        this.app.use('/api/order', orderRouter);
        this.app.use('/api/company', companyRouter);
        this.app.use('/api/auth', authRouter);
    }

    listen() {
        this.server.listen(this.port, () => {
            /* eslint-disable no-console */
            console.log('Listening at', this.port);
        });
    }
}

module.exports = ServerModel;
