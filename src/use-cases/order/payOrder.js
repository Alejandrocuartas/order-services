const { Company } = require('../../entities');

const payOrder = async (companyId, orderId) => {
    try {
        const company = await Company.findById(companyId);
        const resultingOrders = company.orders.filter((order) => order.id.toString() !== orderId);
        company.orders = resultingOrders;
        await company.save();
        return company.orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = payOrder;
