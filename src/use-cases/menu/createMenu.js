const { Menu } = require('../../entities');

const createMenu = async (company) => {
    try {
        const newMenu = new Menu({ company, products: [] });
        await newMenu.save();
        return;
    } catch (error) {
        throw new Error('Could not save the menu');
    }
};

module.exports = createMenu;
