const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Basket extends Model {};

Basket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
                unique: false,
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id',
                unique: false,
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'basket',
    }
);

module.exports = Basket;
