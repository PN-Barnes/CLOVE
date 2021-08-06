const seedUsers = require('./user-seeds');
const seedProducts = require('./product-seeds');
const seedRatings = require('./rating-seeds');
const seedMessages = require('./message-seeds');
const seedBaskets = require('./basket-seeds');

const sequelize = require('../config/connection');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedRatings();
  console.log('\n----- RATINGS SEEDED -----\n');

  await seedMessages();
  console.log('\n----- MESSAGES SEEDED -----\n');

  await seedBaskets();
  console.log('\n----- BASKETS SEEDED -----\n');

  process.exit(0);
};

seedDB();
