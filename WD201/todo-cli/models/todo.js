/* eslint-disable no-unused-vars */
// this is made using "npx sequelize-cli model:generate --name Todo --attributes title:string,dueDate:dateonly,completed:boolean" in terminal

// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     // static associate(models) {   // this is default by "npx sequelize-cli model:generate --name Todo --attributes title:string,dueDate:dateonly,completed:boolean"
//     //   // define association here
//     // }

//     // for check test we modify this by below

//     static async addTask(params) {
//       return await Todo.create(params);
//     }
//     static associate(models) {
//       // define association here
//     }
//     displayableString() {
//       let checkbox = this.completed ? "[x]" : "[ ]";
//       return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
//     }
//   }

//   Todo.init(
//     {
//       title: DataTypes.STRING,
//       dueDate: DataTypes.DATEONLY,
//       completed: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "Todo",
//     }
//   );
//   return Todo;
// };

/* task L5 */

"use strict";
const { Model, Op, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const OverdueTasks = await Todo.findAll({
        where: {
          dueDate: { [Op.it]: new Date() },
        },
      });
      OverdueTasks.forEach((task) => {
        console.log(task.displayableString());
      });

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const TodaydueTask = await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
      });
      TodaydueTask.forEach((task) => {
        console.log(task.displayableString());
      });

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const LaterdueTask = await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
      });
      LaterdueTask.forEach((task) => {
        console.log(task.displayableString());
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
        where: {
          dueDate: { [Op.it]: new Date() },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        },
      );
    }

    displayableString() {
      const today = new Date().toLocaleDateString();
      const dueDate = new Date(this.dueDate).toLocaleDateString();

      if (dueDate === today) {
        const checkbox = this.completed ? "[x]" : "[ ]";
        return `${this.id}. ${checkbox} ${this.title}`;
      }

      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
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
