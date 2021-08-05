const { Product } = require('../models');

const productData = [
  {
    name: 'tomato',
    species: 'fruit',
    organic: 'yes',
  },
  {
    name: 'raddish',
    species: 'vegetable',
    organic: 'yes',
  },
  {
    name: 'apples',
    species: 'fruit',
    organic: 'yes',
  },
  {
    name: 'broccoli',
    species: 'vegetable',
    organic: 'yes',
  },
  {
    name: 'orange',
    species: 'fruit',
    organic: 'yes',
  },
  {
    name: 'carrot',
    species: 'vegetable',
    organic: 'yes',
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;