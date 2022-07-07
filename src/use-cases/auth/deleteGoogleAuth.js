const { Company } = require('../../entities');

const deletMenu = require('../menu/deleteMenu');

const deleteGoogleLogin = async (id) => {
    try {
        const company = await Company.findById(id);
        company.active = false;
        company.orders = [];
        company.tables = [];
        await Promise.all([
            company.save(),
            deletMenu(id),
        ]);
        return;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = deleteGoogleLogin;
