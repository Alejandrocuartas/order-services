const { Menu } = require('../../entities');

const { uploadImage } = require('../../helpers');

const createProduct = async (company, imgPath, name, price = 0) => {
    try {
        const image = await uploadImage(imgPath);
        const menu = await Menu.findOne({ company });
        const newProduct = {
            name,
            image,
            price,
        };
        menu.products.push(newProduct);
        await menu.save();
        return newProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = createProduct;
