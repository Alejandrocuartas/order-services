const { Company } = require('../../entities');

const getOrder = async (companyId, isDelivery = false) => {
    try {
        if (isDelivery) {
            const { orders } = await Company.findById(companyId);
            const deliveries = orders.filter((ord) => ord.isDelivery === true);
            return deliveries;
        }
        const { orders } = await Company.findById(companyId);
        const ordersList = orders.filter((ord) => ord.isDelivery === false);
        return ordersList;
    } catch (error) {
        throw new Error('Error when getting orders.');
    }
};

module.exports = getOrder;
