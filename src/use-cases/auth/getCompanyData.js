const { Company } = require('../../entities');

const getCompanyData = async (companyId) => {
    try {
        const company = await Company.findById(companyId);
        return company;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getCompanyData;
