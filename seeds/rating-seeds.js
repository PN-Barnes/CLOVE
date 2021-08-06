const { Rating } = require('../models');

const ratingData = [
  
];

const seedRatings = () => Rating.bulkCreate(ratingData);

module.exports = seedRatings;