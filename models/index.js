const User = require('./user');
const Product = require('./product');
const Rating = require('./rating');
const Message = require('./message');
const Basket = require('./basket');

// foreign keys of basket
Product.hasMany(Basket, {
    foreignKey: 'product_id',
});

Basket.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

User.hasMany(Basket, {
    foreignKey: 'user_id',
});

Basket.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// foreign keys of rating
User.hasMany(Rating, {
    foreignKey: 'recipient_id',
});

Rating.belongsTo(User, {
    as: 'recipient',
    foreignKey: 'recipient_id',
});

User.hasMany(Rating, {
    foreignKey: 'poster_id',
});

Rating.belongsTo(User, {
    as: 'poster',
    foreignKey: 'poster_id',
});

Product.hasMany(Rating, {
    foreignKey: 'product_id',
});

Rating.belongsTo(Product, {
    foreignKey: 'product_id',
});

// foreign keys of message
User.hasMany(Message, {
    foreignKey: 'recipient_id',
});

Message.belongsTo(User, {
    as: 'recipient',
    foreignKey: 'recipient_id',
});

User.hasMany(Message, {
    foreignKey: 'sender_id',
});

Message.belongsTo(User, {
    as: 'sender',
    foreignKey: 'sender_id',
});

module.exports = { User, Product, Rating, Message, Basket };