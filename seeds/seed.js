// loading the user and prodct seed modules
const userSeeds = require('./user-seeds');
const productSeeds = require('./product-seeds');

// loading sequilize model
const sequelize = require('../config/connection');

// arrow function to sync database and seed individual models
const seedDB = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----');
    
    // seeding user data from user-seeds.js
    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');
    // seeding product data from product-seeds.js
    await productSeeds();
    console.log('\n----- PRODUCTS SEEDED -----\n');

    process.exit(0);
};

// calling seedDB
seedDB();