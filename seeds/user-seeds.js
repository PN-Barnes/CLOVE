const { User } = require('../models');

// user passwords are all 123456
const userData = [
  {
    username: 'pbarnes',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '90293',
  },
  {
    username: 'natebatch',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '90211',
  },
  {
    username: 'pbyakod',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '94566',
  },
  {
    username: 'qiushuangt',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '90275',
  },
  {
    username: 'farleythecat',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '93314',
  },
  {
    username: 'berkeleybc',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '93552',
  },
  {
    username: 'user1',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '93552',
  },
  {
    username: 'user2',
    password: '$2b$10$0sZ1k1TG4brNZ.nEGLvgEeeS8S7j5pAMo8ykfLHcTCY12w9Wsl72e',
    zipcode: '93552',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
