/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "Uday@1003";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false, //it not print the logging in the terminal
});

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};
