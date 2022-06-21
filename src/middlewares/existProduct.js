const { existingProduct } = require('../use-cases');

const existProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { companyId } = req;
        const exist = await existingProduct(companyId, id);
        if (exist) { return next(); } throw new Error('unexpected error');
    } catch (error) {
        return res.status(400).json({
            message: 'Could not edit product',
            error: error.message,
        });
    }
};

module.exports = existProduct;
