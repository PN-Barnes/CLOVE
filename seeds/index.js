const seedUsers = require('./user-seeds');
const seedProducts = require('./product-seeds');
const seedRatings = require('./rating-seeds');
const seedMessages = require('./message-seeds');
const seedBasket = require('./basket-seeds');
const sequelize = require('../config/connection');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  process.exit(0);
};

seedDB();
