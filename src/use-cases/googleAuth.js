const { googleValidator, jwtGenerator } = require('../helpers');

const { Company } = require('../entities');

const googleAuth = async (googleToken) => {
    try {
        const companyData = await googleValidator(googleToken);

        const existingUser = await Company.findOne({ email: companyData.email });
        if (existingUser) {
            await Company.findByIdAndDelete(existingUser.id);
        }

        const newCompany = new Company(companyData);
        const savedCompany = await newCompany.save();
        const jwt = await jwtGenerator(savedCompany.id);
        return jwt;
    } catch (error) {
        throw new Error('Could not authenticate');
    }
};

module.exports = googleAuth;
