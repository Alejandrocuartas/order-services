const { Menu } = require('../../entities');
const { deleteImage } = require('../../helpers');

const deletMenu = async (company) => {
    try {
        const menu = await Menu.findOneAndDelete({ company });
        const { products } = menu;
        for (const p of products) {
            if(p.image){
                deleteImage(p.image);
            }
        }
        return;
    } catch (error) {
        throw new Error('Could not delete the menu');
    }
};

module.exports = deletMenu;
