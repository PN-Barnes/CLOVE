const { Basket } = require('../models');

const basketData = [
  {
    stock: '3',
    price: '3.50',
    description: 'The sweetest tomatoes across the country!',
  },
  {
    stock: '6',
    price: '2.25',
    description: 'Locally produced veggies at an affordable price.',
  },
  {
    stock: '5',
    price: '1.99',
    description: 'Delicious and heartwarming!',
  },
  {
    stock: '9',
    price: '6.99',
    description: 'You can never get over these freshly-produced broccoli.',
  },
  {
    stock: '4',
    price: '5.50',
    description: 'An amazing deal for organic and homegrown vegetables!',
  },
];

const seedBaskets = () => basket.bulkCreate(basketData);

module.exports = seedBaskets;