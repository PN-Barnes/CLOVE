const { Basket } = require('../models');

const basketData = [
  {
    stock: '3',
    price: '3.50',
    description: 'The sweetest tomatoes across the country!',
    user_id: '1',
    product_id: '1',
  },
  {
    stock: '6',
    price: '2.25',
    description: 'Locally produced veggies at an affordable price.',
    user_id: '2',
    product_id: '2',
  },
  {
    stock: '5',
    price: '1.99',
    description: 'Delicious and heartwarming!',
    user_id: '3',
    product_id: '3',
  },
  {
    stock: '9',
    price: '6.99',
    description: 'You can never get over these freshly-produced broccoli.',
    user_id: '4',
    product_id: '4',
  },
  {
    stock: '4',
    price: '5.50',
    description: 'An amazing deal for organic and homegrown vegetables!',
    user_id: '5',
    product_id: '5',
  },
];

const seedBaskets = () => Basket.bulkCreate(basketData);

module.exports = seedBaskets;