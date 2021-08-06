const { Rating } = require('../models');

const ratingData = [
  {
    score: '1',
    content: 'Quality not up to standards!',
    date_created: '08/05/2021',
  },
  {
    score: '2',
    content: 'Quality not quite up to standards!',
    date_created: '08/05/2021',
  },
  {
    score: '3',
    content: 'Mediocre quality produce!',
    date_created: '08/05/2021',
  },
  {
    score: '4',
    content: 'Good quality produce!',
    date_created: '08/05/2021',
  },
  {
    score: '5',
    content: 'Exceptional quality produce!',
    date_created: '08/05/2021',
  },
];

const seedRatings = () => Rating.bulkCreate(ratingData);

module.exports = seedRatings;