const { Menu } = require('../../entities');

const getProducts = async (companyId) => {
    try {
        const menu = await Menu.findOne({ companyId });
        if (!menu) {
            throw new Error('There is not menu yet.');
        }
        return menu;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getProducts;
