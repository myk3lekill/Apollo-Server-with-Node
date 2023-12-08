const ordersModel = require('./orders.model')

module.exports = {
    Query: {
        orders: async (parent, args, context, info) => {
          console.log('Getting orders...');
          const order = await Promise.resolve(ordersModel.getAllOrders());
          return order;
        }
    }
}