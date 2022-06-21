const { Company } = require('../../entities');

const getTablesList = async (companyId) => {
    try {
        const { tables } = await Company.findById(companyId);
        return tables;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getTablesList;
