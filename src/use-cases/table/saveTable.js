const { Company } = require('../../entities');
const { uploadQr } = require('../../helpers');

const saveTable = async (companyId, tableInfo, path) => {
    try {
        const qrUrl = await uploadQr(path);
        tableInfo.qr = qrUrl;
        const company = await Company.findById(companyId);
        company.tables.push(tableInfo);
        const { tables } = await company.save();
        return tables;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = saveTable;
