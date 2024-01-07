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
      // define association here
    }

    // create the todo by static method with is connected to the "index.js"
    // we use this because we made a single or more update in this todo , that affect and connect the all todo which is connected to this todo
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
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
    static deletetodo() {
      return this.destroy({ where: { id: this.id } });
    }

    static async overdue() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
          // completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().split("T")[0],
          },
          // completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
          // completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    //   markAsCompleted(bool) {
    //     return this.update({ completed: bool });
    //   }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
