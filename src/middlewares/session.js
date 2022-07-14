const jwt = require('jsonwebtoken');
const { request, response } = require('express');

/* eslint-disable default-param-last */
const session = (req = request, res = response, next) => {
    const token = req.cookies.userToken;
    if (!token) {
        return res.status(401).json({
            msg: 'User is not logged',
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        req.companyId = id;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unvalid user token',
            error: error.message,
        });
    }
};

module.exports = session;
