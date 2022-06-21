const jwt = require('jsonwebtoken');

const sessionHandler = (token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        return id;
    } catch (error) {
        throw new Error('Could not verify token. Maybe the session has expired.');
    }
};

module.exports = sessionHandler;
