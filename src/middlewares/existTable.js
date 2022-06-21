const { request, response } = require('express');

const { existingTable } = require('../use-cases');

/* eslint-disable default-param-last */
const existTable = async (req = request, res = response, next) => {
    try {
        const id = req.companyId;
        const { number } = req.body;
        const exist = await existingTable(id, number);

        if (!exist) { return next(); } throw new Error('unexpected error');
    } catch (error) {
        return res.status(400).json({
            message: 'Could not save the table',
            error: error.message,
        });
    }
};

module.exports = existTable;
