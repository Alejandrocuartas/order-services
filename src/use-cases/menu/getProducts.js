const { Menu } = require('../../entities');

const getProducts = async (companyId) => {
    try {
        const menu = await Menu.findOne({ company: companyId });
        if (!menu || menu.company.toString() !== companyId) {
            throw new Error('There is not menu yet.');
        }
        return menu;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getProducts;
