const { Menu } = require('../../entities');

const { uploadImage } = require('../../helpers');

const createProduct = async (company, imgPath, name, description, price = 0) => {
    try {
        let image = '';
        if(imgPath){
            image = await uploadImage(imgPath);
        }
        const menu = await Menu.findOne({ company });
        const newProduct = {
            name,
            image,
            price,
            description,
        };
        menu.products.push(newProduct);
        await menu.save();
        return menu.products;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = createProduct;
