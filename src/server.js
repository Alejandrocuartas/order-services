const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const { dbConnector } = require('./data-access');
const socketControl = require('./socket-control');
const {
    orderRouter,
    tableRouter,
    authRouter,
    menuRouter,
} = require('./routes');

class ServerModel {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = new Server(this.server, {
            cors:  ['https://ordena.netlify.app', 'http://localhost:8080'],
        });

        this.dbConnector();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async dbConnector() {
        await dbConnector();
    }

    middlewares() {
        this.app.use('/api', express.static('public'));
        this.app.use(express.json());
        this.app.use(cors({
            origin: ['https://ordena.netlify.app', 'http://localhost:8080'],
            credentials: true
        }));
        this.app.use(cookieParser());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }));
    }

    sockets() {
        this.io.on('connection', socketControl);
    }

    routes() {
        this.app.use('/api/order', orderRouter);
        this.app.use('/api/table', tableRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/menu', menuRouter);
    }

    listen() {
        this.server.listen(this.port, () => {
            /* eslint-disable no-console */
            console.log('Listening at', this.port);
        });
    }
}

module.exports = ServerModel;
