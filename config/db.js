const Sequelize = require('sequelize');


let sequelize = new Sequelize('petclinic', 'petclinic', 'password', {
  host: 'localhost', port: 3306,
  host: '192.168.99.100', port: 3307,


// let sequelize = new Sequelize('notesapp', 'root', 'abcdef', {
//   host: 'localhost', port: 3306,
//   host: '192.168.99.100', port: 3307,
  dialect: 'mysql'  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
}, {pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  }});

module.exports = sequelize;