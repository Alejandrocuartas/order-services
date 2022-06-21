const { Menu } = require('../../entities');

const { deleteImage } = require('../../helpers');

const deletProduct = async (companyId, productId) => {
    try {
        const menu = await Menu.findOne({ companyId });
        if (menu.company.toString() !== companyId) {
            throw new Error('The id of the company is not the same as the menu s');
        }
        let urlImage;
        const resultingProducts = menu.products.filter((product) => {
            if (product.id === productId) {
                urlImage = product.image;
            }
            return product.id !== productId;
        });
        await deleteImage(urlImage);
        menu.products = resultingProducts;
        await menu.save();
        return resultingProducts;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = deletProduct;
