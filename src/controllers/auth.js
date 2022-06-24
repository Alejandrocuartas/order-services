const { request, response } = require('express');

const { googleAuth, deleteGoogleLogin } = require('../use-cases');

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
            error: error.message,
        });
    }
};

const deleteGLogin = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        await deleteGoogleLogin(companyId);
        res.status(200).json({
            message: 'Company deleted correctly',
        });
    } catch (error) {
        res.status(500).json({
            message: 'could not delete company',
            error: error.message,
        });
    }
};

module.exports = {
    googleLogin,
    deleteGLogin,
};
