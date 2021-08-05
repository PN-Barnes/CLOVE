const sequelize = require('../config/connection');

const userData = require('./userData');
const ProductData = require('./productData');
const { User, Product } = require('../models');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const product of ProductData) {
    await Product.create({
      ...product,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDB();
