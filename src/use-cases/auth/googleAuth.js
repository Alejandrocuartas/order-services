const { googleValidator, jwtGenerator } = require('../../helpers');
const { logger } = require('../../utils');
const { Company } = require('../../entities');

const googleAuth = async (googleToken) => {
    try {
        logger.info('[googleAuth.js]: starting tu validate GSI credential...');
        const companyData = await googleValidator(googleToken);
        logger.info('[googleAuth.js]: starting tu validate if company exists...');
        const existingUser = await Company.findOne({ email: companyData.email });
        if (existingUser) {
            logger.info('[googleAuth.js]: logging in...');
            existingUser.active = true;
            existingUser.save();
            const jwt = await jwtGenerator(existingUser.id);
            return jwt;
        }
        logger.info('[googleAuth.js]: signin up...');
        const newCompany = new Company(companyData);
        const savedCompany = await newCompany.save();
        const jwt = await jwtGenerator(savedCompany.id);
        return jwt;
    } catch (error) {
        logger.error(`[googleAuth.js]: ${error.message}`);
        throw new Error(error.message);
    }
};

module.exports = googleAuth;
