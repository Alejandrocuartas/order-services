const { Company } = require('../../entities');

const payOrder = async (companyId, orderId) => {
    try {
        let isDeliv = false;
        const company = await Company.findById(companyId);
        const resultingOrders = company.orders.filter((order) => {
            if(order.id.toString() === orderId){
                if(order.isDelivery){
                    isDeliv = true;
                }
            }
            return order.id.toString() !== orderId
        });
        company.orders = resultingOrders;
        const returningOrders = resultingOrders.filter(ord => {
            if(isDeliv){
                return ord.isDelivery === true
            }
            return ord.isDelivery === false
        })
        await company.save();
        return returningOrders;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = payOrder;
