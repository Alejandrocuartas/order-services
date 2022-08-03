const { Company } = require('../../entities');

const createOrder = async (companyId, newOrder) => {
    try {
        if (newOrder.isDelivery) {
            const company = await Company.findById(companyId);
            company.orders.push(newOrder);
            await company.save();
            const ordersList = company.orders.filter((ord) => ord.isDelivery === true);
            return {
                created: true,
                orders: ordersList,
            };
        }
        const company = await Company.findById(companyId);
        company.orders.push(newOrder);
        await company.save();
        const ordersList = company.orders.filter((ord) => ord.isDelivery === false);
        return {
            created: true,
            orders: ordersList,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = createOrder;
