const { Company } = require('../../entities');

const patchOrd = async (companyId, orderId) => {
    try {
        const company = await Company.findById(companyId);
        const current = company.orders.map((order) => {
            if (order.id === orderId) {
                order.received = true;
            }
            return order;
        });
        company.orders = current;
        await company.save();
        return company.orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = patchOrd;
