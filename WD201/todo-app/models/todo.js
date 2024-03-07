/* eslint-disable no-unused-vars */
/* this is auto generate by "npx sequelize-cli model:generate --name Todo --attributes title:string,dueDate:dateonly,completed:boolean" */
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define relation with the "userId"
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
      // define association here
    }

    // create the todo by static method with is connected to the "index.js"
    // we use this because we made a single or more update in this todo , that affect and connect the all todo which is connected to this todo
    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }

    static getTodo() {
      return this.findAll();
    }

    // use intens method for update the "markAsCompleted"
    markAsCompleted() {
      return this.update({ completed: true });
    }

    // toggle status of complitation give alternate if "true" then it change to "false"
    toggleCompletionStatus(comp) {
      const notcomp = !comp;
      return this.update({ completed: notcomp });
    }

    // to delete the route from the postman
    static deletetodo(userId) {
      return this.destroy({
        where: {
          id: this.id,
          //  userId
        },
      });
    }

    static completedItem(userId) {
      //In order to get only completed Todos
      return this.findAll({
        where: { completed: true },
        order: [["id", "ASC"]],
        userId, // we ste "userId" that checks the user-id , if the given id is same to "userId" , only then it shows theirs todos
      });
    }

    static async overdue(userId) {
      return this.findAll({
        where: {
          completed: false,
          userId,
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday(userId) {
      return this.findAll({
        where: {
          completed: false,
          userId,
          dueDate: {
            [Op.eq]: new Date().toISOString().split("T")[0],
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater(userId) {
      return this.findAll({
        where: {
          completed: false,
          userId,
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
          // userId, // it checks the corrent id is same to user-id then , only specified todo is deleted from their specified id , noy delete todo from another id
        },
      });
    }
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: 5,
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          len: 5,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
