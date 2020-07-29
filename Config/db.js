const Sequelize = require('sequelize');

const db = new Sequelize('crudnodejs', 'root', '', {
    dialect: 'mysql'
});

db.sync( {} );

module.exports = db;