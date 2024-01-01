// making tabel and insert raw using sequelize in DataBase
/*eslint-disable*/

// we use first type of method of define the table and insert raw

/*
const { DataTypes } = require("sequelize");
const { sequelize } = require("./connectDB.js");

const Todo = sequelize.define(
  // define the table
  "Todo", // use to insert raw into the table wich we declare
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING, // declaremodel having name (title) , give type (string)
      allowNull: false, // we don't allow there are value is (Null)
    },
    dueDate: {
      type: DataTypes.DATEONLY, // declaremodel having name (dueDate) , give type (dateonly) which showing Date without timestamp
    },
    complete: {
      type: DataTypes.BOOLEAN, // declaremodel having name (completed) , give type (boolean)
    },
  },
  {
    tableName: "todos", // define the table name (todos)
  }
);
module.exports = Todo; // we export this into Todo
Todo.sync(); // create the table
*/

// we use second type of method of define the table and ensert raw
/*eslint-disable*/
const { DataTypes, Model } = require("sequelize"); // define we use sequelize for {sequelize, DataTypes, Model}
const { sequelize } = require("./connectDB"); // connect to (connectDB) for get connection between DataBase

class Todo extends Model {
  static async addTask(params) {
    //to create addtask and connect to the (index.js) , it called static method
    return await Todo.create(params); //it add the data given in the
  }
  // now use insteds method for done the work from here and , connect to the (index.js)
  displayableString() {
    return ` ${this.completed ? "[X]" : "[ ]"} ${this.id}. ${this.title} - ${
      this.dueDate
    }`;
  }
} //syntax of define table using (extends Modal)

Todo.init(
  // create the table name (Todo), using init
  {
    // Modal attribute are define here
    title: {
      type: DataTypes.STRING, // declaremodel having name (title) , give type (string)
      allowNull: false, // we don't allow there are value is (Null)
    },
    dueDate: {
      type: DataTypes.DATEONLY, // declaremodel having name (dueDate) , give type (dateonly) which showing Date without timestamp
      allowNull: false, // we don't allow there are value is (Null)
    },
    completed: {
      type: DataTypes.BOOLEAN, // declaremodel having name (completed) , give type (boolean)
      allowNull: false, // we don't allow there are value is (Null)
    },
  },
  {
    sequelize, // for saying we create this for DataBase , so we call (sequelize: mySequelize) which is connect us with DataBase
  },
);

module.exports = Todo; // we export this into Todo

//Todo.sync(); // call that Table
