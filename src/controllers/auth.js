const { request, response } = require('express');

const { logger } = require('../utils');
const { googleAuth, deleteGoogleLogin, getCompanyData } = require('../use-cases');

const googleLogin = async (req = request, res = response) => {
    logger.info('[POST: /api/auth/glogin]: starting login/signup process...');
    try {
        const { googleToken } = req.body;
        const token = await googleAuth(googleToken);
        res.status(200)
            .json({
                message: 'Logged correctly',
                userToken: token,
            });
    } catch (error) {
        logger.error(`[POST: /api/auth/glogin]: ${error.message}`);
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

const getAuthData = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const companyData = await getCompanyData(companyId);
        res.status(200)
            .json({
                message: 'Company info.',
                companyData,
            });
    } catch (error) {
        res.status(500).json({
            message: 'could not get company info',
            error: error.message,
        });
    }
};

module.exports = {
    googleLogin,
    deleteGLogin,
    getAuthData,
};
