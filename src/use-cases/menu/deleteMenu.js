const { Menu } = require('../../entities');

const deletMenu = async (company) => {
    try {
        await Menu.findOneAndDelete({ company });
        return;
    } catch (error) {
        throw new Error('Could not delete the menu');
    }
};

module.exports = deletMenu;
