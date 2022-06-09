const { request, response } = require('express');

const { googleAuth } = require('../use-cases');

const googleLogin = async (req = request, res = response) => {
    const { googleToken } = req.body;
    try {
        const token = await googleAuth(googleToken);
        res.status(200)
            .header('Access-Control-Allow-Credentials', true)
            .header('access-control-expose-headers', 'Set-Cookie')
            .cookie('userToken', token, { sameSite: 'none', secure: true })
            .json({
                message: 'Logged correctly',
            });
    } catch (error) {
        res.status(401).json({
            error,
        });
    }
};

module.exports = {
    googleLogin,
};
