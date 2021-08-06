const { Rating } = require('../models');

const ratingData = [
  {
    score: '1',
    content: 'Quality not up to standards!',
    date_created: '08/05/2021',
    recipient_id: '1',
    poster_id: '3',
    product_id: '2',
  },
  {
    score: '2',
    content: 'Quality not quite up to standards!',
    date_created: '08/05/2021',
    recipient_id: '2',
    poster_id: '4',
    product_id: '6',
  },
  {
    score: '3',
    content: 'Mediocre quality produce!',
    date_created: '08/05/2021',
    recipient_id: '3',
    poster_id: '2',
    product_id: '5',
  },
  {
    score: '4',
    content: 'Good quality produce!',
    date_created: '08/05/2021',
    recipient_id: '4',
    poster_id: '3',
    product_id: '2',
  },
  {
    score: '5',
    content: 'Exceptional quality produce!',
    date_created: '08/05/2021',
    recipient_id: '5',
    poster_id: '4',
    product_id: '1',
  },
];

const seedRatings = () => Rating.bulkCreate(ratingData);

module.exports = seedRatings;