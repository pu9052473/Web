/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
const todoList = require('../todo');  // import the todo.js file 

const { all , markAsComplete , add } = todoList();

describe("Todolist test suite" , () => {
   test("Should add new todo" , () => {
    expect(all.length).toBe(0);              // before there are no any list 
    add(                                     // we add one list 
        {
            title : "Test todo",
            completed : false ,
            dueDate : new Date().toLocaleDateString("en-CA"),
        }
    );
     expect(all.length).toBe(1);             // then we expect there are one list
   });

   test("Should mark as todo complete" , () => {
    expect(all[0].completed).toBe(false);         // it check all[0].completed is "false "or not
    markAsComplete(0);                            // call the markAsCompleted , one we are check it then it convert "false" into the "true"
    expect(all[0].completed).toBe(true);          // the it it check all[0].completed is "true "or not
   })
})
*/

/*eslint-disable*/
/*
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist test suite", () => {
  const item = todoList(); // this taken all the function from the todoList() , like all,add,etc.
  beforeAll(() => {
    // this beforeAll exucute the code which we given inside before the all given code
    item.add({
      title: "Test todo",
      completed: false, // we add this data , so it's length is increse , become (1)
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = item.all.length; // this give all.length=(1) to the variable
    item.add({
      title: "Test todo",
      completed: false, // we add this data , so it's length is increse , become (1+1 = 2)
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(item.all.length).toBe(todoItemsCount + 1); // this give value and expect ( todoItemsCount + 1) = (1+1)
  });

  test("Should mark as todo complete", () => {
    expect(item.all[0].completed).toBe(false); // before it was "false" , so it pass the test
    markAsComplete(0); // after call this it done the work , it converted from "false" to "true"
    expect(item.all[0].completed).toBe(true); // after it is become "true" , so it pass the test
  });

  let Today = new Date();
  // const today = formattedDate(Today);
  const yesterday = new Date(Today); // call the Today as new Date
  yesterday.setDate(Today.getDate() - 1); // after that we cut one from the today's date , so it become the day before , mean yesterday
  const tomorrow = new Date(Today); // call the Today as new Date
  tomorrow.setDate(Today.getDate() + 1); // after that we add one from the today's date , so it become the day after , mean tomorrow

  test("check date is always yesterday", async () => {
    await item.add({
      dueDate: Today.getDate() - 1, // we check is that's date is  yesterday or not
    });

    const checkYesterdayDate = await item.overdue(); // call overdue and store in new variable
    console.log(checkYesterdayDate); // print the value which is changed
    expect(checkYesterdayDate.length).toBe(1); // value is changed so it add , and length become (1)
  });

  test("to check today's date", async () => {
    await item.add({
      dueDate: Today, // we check this date is today's date or not
    });

    const checkTodayDate = await item.dueToday(); // call dueToday and store in new variable
    console.log(checkTodayDate); // print the value , in this value is not changed
    expect(checkTodayDate.length).toBe(0); // value is not changed , so it's length remain (0)
  });

  test("check date is always tomorrow", async () => {
    await item.add({
      dueDate: Today.getDate() + 1, // we check this date is tomorrow's date or not
    });

    const checkTomorrowDate = await item.dueLater(); // call dueLater and store in new variable
    console.log(checkTomorrowDate); // print the value which is changed
    expect(checkTomorrowDate.length).toBe(1); // value is changed so it add , and length become (1)
  });
});
*/

// use this for test in DataBase by scripts in the package.json is "db:create:test": "cross-env NODE_ENV=test sequelize-cli db:create"
/*
const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
*/
