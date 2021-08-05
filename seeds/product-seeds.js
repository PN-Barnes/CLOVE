const { Product } = require('../models');

const productData = [
  
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;