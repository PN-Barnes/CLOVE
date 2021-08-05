const { Product } = require('../models');

const productData = [
  {
    name: 'tomato',
    species: 'fruit',
    organic: true,
  },
  {
    name: 'raddish',
    species: 'vegetable',
    organic: true,
  },
  {
    name: 'apples',
    species: 'fruit',
    organic: true,
  },
  {
    name: 'broccoli',
    species: 'vegetable',
    organic: true,
  },
  {
    name: 'orange',
    species: 'fruit',
    organic: true,
  },
  {
    name: 'carrot',
    species: 'vegetable',
    organic: true,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
