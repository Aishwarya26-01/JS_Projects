const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_project', 'root', 'Aishwarya@26', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;