const { Message } = require('../models');

const messageData = [
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date_created: '08/05/2021',
    recipient_id: '1',
    sender_id: '5',
  },
  {
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date_created: '08/05/2021',
    recipient_id: '2',
    sender_id: '4',
  },
  {
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date_created: '08/05/2021',
    recipient_id: '3',
    sender_id: '2',
  },
  {
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date_created: '08/05/2021',
    recipient_id: '4',
    sender_id: '3',
  },
  {
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    date_created: '08/05/2021',
    recipient_id: '5',
    sender_id: '1',
  },
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;