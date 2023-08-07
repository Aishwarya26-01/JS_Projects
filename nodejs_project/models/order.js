const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: Sequelize.STRING,
    details: Sequelize.STRING,
    category: Sequelize.STRING,
});

module.exports = Order;