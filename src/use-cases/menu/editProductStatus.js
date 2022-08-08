const { Menu } = require('../../entities');

const editProductStatus = async (company, productId) => {
    try {
        const menu = await Menu.findOne({ company });
        const products = menu.products.map((product) => {
            if (product.id.toString() === productId) {
                product.available = !product.available;
            }
            return product;
        });
        menu.products = products;
        await menu.save();
        const editedProduct = products.filter((p) => p.id.toString() === productId);
        return editedProduct[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = editProductStatus