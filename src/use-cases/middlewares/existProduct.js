const { Menu } = require('../../entities');

const existingProduct = async (companyId, id) => {
    try {
        const { products } = await Menu.findOne({ company: companyId });
        /* eslint-disable eqeqeq */
        const existingP = products.find((product) => product.id.toString() === id);
        if (!existingP) {
            throw new Error('The product with that id does not exist.');
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = existingProduct;
