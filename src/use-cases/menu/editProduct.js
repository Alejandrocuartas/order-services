const { Menu } = require('../../entities');

const editProduct = async (company, id, newPrice) => {
    try {
        const menu = await Menu.findOne({ company });
        const products = menu.products.map((product) => {
            if (product.id.toString() === id) {
                product.price = newPrice;
            }
            return product;
        });
        menu.products = products;
        await menu.save();
        const editedProduct = products.filter((p) => p.id.toString() === id);
        return editedProduct[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = editProduct;
