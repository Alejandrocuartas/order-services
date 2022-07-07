const { Company } = require('../../entities');

const getTablesList = async (companyId) => {
    try {
        const company = await Company.findById(companyId);
        return { tables: company.tables, company: company.id };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getTablesList;
