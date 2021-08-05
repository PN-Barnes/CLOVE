const { User } = require('../models');

const userData = [
  {
    username: 'pbarnes',
    password: 'qiN1CgPj',
    zipcode: '90293',
  },
  {
    username: 'natebatch',
    password: 'n0d0KVh6',
    zipcode: '90211',
  },
  {
    username: 'pbyakod',
    password: 's1apULaM',
    zipcode: '94566',
  },
  {
    username: 'qiushuangt',
    password: 'CAqusW78',
    zipcode: '90275',
  },
  {
    username: 'farleythecat',
    password: 'J8y6rtW8',
    zipcode: '93314',
  },
  {
    username: 'berkeleybc',
    password: 'w1q37cV4',
    zipcode: '93552',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
