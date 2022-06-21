const { Company } = require('../../entities');

const deleteTable = async (companyId, tableNumber) => {
    try {
        const company = await Company.findById(companyId);
        const resultingTables = company.tables.filter((table) => table.number !== tableNumber);
        company.tables = resultingTables;
        await company.save();
        return resultingTables;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = deleteTable;
