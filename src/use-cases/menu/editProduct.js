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
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = editProduct;
