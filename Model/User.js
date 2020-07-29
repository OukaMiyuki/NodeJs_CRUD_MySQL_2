const Sequelize = require('sequelize');
const db = require('../Config/db');

const User = db.define(
    "user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { freezeTableName: true }
);

module.exports = User;