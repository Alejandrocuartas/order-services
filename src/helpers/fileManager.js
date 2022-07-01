const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage = async (imgPath) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(imgPath, {
            folder: 'order',
        });
        return secure_url;
    } catch (error) {
        throw new Error('could not upload image');
    }
};

const deleteImage = async (imgUrl = '') => {
    const urlFilter = imgUrl.split('/');
    const foldr = urlFilter[urlFilter.length - 2];
    const publicId = urlFilter[urlFilter.length - 1].split('.');
    try {
        await cloudinary.uploader.destroy(`${foldr}/${publicId[0]}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    uploadImage,
    deleteImage,
};
