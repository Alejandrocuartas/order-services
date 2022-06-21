const mongoose = require('mongoose');

const dbConnector = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);
        /* eslint-disable no-console */
        console.log('database conected');
    } catch (error) {
    /* eslint-disable no-console */
        console.log(error);
    }
};

module.exports = {
    dbConnector,
};
