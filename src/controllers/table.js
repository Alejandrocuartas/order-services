const { response, request } = require('express');

const { saveTable, getTablesList, deleteTable } = require('../use-cases');

const postTable = async (req = request, res = response) => {
    const { companyId, body } = req;
    try {
        await saveTable(companyId, body);
        return res.status(200).json({
            message: 'the table was saved.',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'could not save table.',
            error: error.message,
        });
    }
};

const getTables = async (req = request, res = response) => {
    const { companyId } = req;
    try {
        const tables = await getTablesList(companyId);
        return res.status(200).json({
            amount: tables.length,
            tables,
        });
    } catch (error) {
        return res.status(404).json({
            message: 'could not find tables.',
            error: error.message,
        });
    }
};

const deleteT = async (req = request, res = response) => {
    try {
        const { companyId } = req;
        const { number } = req.body;
        const deletedTable = await deleteTable(companyId, number);
        return res.status(200).json({
            message: `table number ${number} deleted.`,
            remainingTables: deletedTable,
        });
    } catch (error) {
        return res.status(404).json({
            message: 'could not delete table.',
            error: error.message,
        });
    }
};

module.exports = {
    postTable,
    getTables,
    deleteT,
};
