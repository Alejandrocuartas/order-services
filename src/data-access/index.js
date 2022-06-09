const mongoose = require('mongoose');

const dbConnector = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);
        /* eslint-disable no-console */
        console.log('database conected');
    } catch (error) {
    /* eslint-disable no-console */
        console.log(error);
        throw new Error('Error when connecting database');
    }
};

module.exports = {
    dbConnector,
};
