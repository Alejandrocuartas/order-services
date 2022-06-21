const { Company } = require('../../entities');

const getOrder = async (companyId) => {
    try {
        const { orders } = await Company.findById(companyId);
        return orders;
    } catch (error) {
        throw new Error('Error when getting orders.');
    }
};

module.exports = getOrder;
