const Sequelize = require('sequelize');
const sequelize = require('./../config/db');

class Note extends Sequelize.Model { }

Note.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      // is: {
      //   args: ["^([a-zA-Z]{3,})(\\s[a-zA-Z]{2,})*$"],
      //   msg: "Enter a valid name."
      // }
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('completed', 'pending'),
    defaultValue: 'pending',
    allowNull: false
  },
}, { sequelize, modelName: 'note', timestamps: false });

module.exports = Note;