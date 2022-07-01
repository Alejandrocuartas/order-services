const { googleValidator, jwtGenerator } = require('../../helpers');

const { Company } = require('../../entities');

const googleAuth = async (googleToken) => {
    try {
        const companyData = await googleValidator(googleToken);
        const existingUser = await Company.findOne({ email: companyData.email });
        if (existingUser) {
            existingUser.active = true;
            existingUser.save();
            const jwt = await jwtGenerator(existingUser.id);
            return jwt;
        }
        const newCompany = new Company(companyData);
        const savedCompany = await newCompany.save();
        const jwt = await jwtGenerator(savedCompany.id);
        return jwt;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = googleAuth;
