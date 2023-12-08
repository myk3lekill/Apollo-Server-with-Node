const productsModel = require('./products.model')

module.exports = {
    Query: { 
        products: async (parent, args, context, info) => {
        console.log('Getting the products...');
        const product = await Promise.resolve(productsModel.getAllProducts());
        return product;
      },
        productsByPrice: (_, args) => {
          console.log('Getting the products by price...');
          return productsModel.getProductsByPrice(args.min, args.max)
        },
        productById: (_, args) => {
          console.log('Getting the products by id...');
          return productsModel.getProductById(args.id)
        }
    },
    Mutation: {
      addNewProduct: (_, args) => {
        console.log('New product added...');
        return productsModel.addNewProduct(args.id, args.description, args.price)
      },
      addNewProductReview: (_, args) => {
        console.log('New product review added...');
        return productsModel.addNewProductReview(args.id, args.rating, args.comment)
      }
    }
}
