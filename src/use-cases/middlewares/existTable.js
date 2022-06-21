const { Company } = require('../../entities');

const existingTable = async (id, number) => {
    try {
        const { tables } = await Company.findById(id);
        /* eslint-disable eqeqeq */
        const existingT = tables.find((table) => table.number == number);
        if (existingT) {
            throw new Error('The table with that number already exists.');
        }
        return false;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = existingTable;
