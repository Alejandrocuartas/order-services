const { Company } = require('../../entities');

const createOrder = async (companyId, newOrder) => {
    try {
        const company = await Company.findById(companyId);
        company.orders.push(newOrder);
        await company.save();
        return {
            created: true,
            orders: company.orders,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = createOrder;
