const { Company } = require('../../entities');

const saveTable = async (companyId, tableInfo) => {
    try {
        const company = await Company.findById(companyId);
        company.tables.push(tableInfo);
        await company.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = saveTable;
