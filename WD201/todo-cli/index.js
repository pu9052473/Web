/* eslint-disable no-unused-vars */
// to Add,Update,Delete data

// const { connect } = require("./connectDB"); // connect with (connectDB) , for connect to DataBase
// const Todo = require("./TodoModel"); //connect (TodoModal) , to the (Todo)

// const createTodo = async () => {
//   // call the table Todo for Add the Data
//   try {
//     await connect();
//     //create the data inside the table
//     // const todo = await Todo.addTask({
//     //   title: "second item",
//     //   dueDate: new Date(), // this is not a proper way ,so we use
//     //   completed: false,
//     // });
//     // it call addTask from (TodoModal.js) which add item , it called static method
//     const todo = await Todo.addTask({
//       title: "second item",
//       dueDate: new Date(),
//       completed: false,
//     });
//     console.log(`Create todo with ID : ${todo.id}`); // print the how many number of data we Add
//   } catch (error) {
//     console.error(error); // if error , say error
//   }
// };

// const countItems = async () => {
//   try {
//     const totalCount = await Todo.count(); // this count the total items in the table
//     console.log(`Found ${totalCount} items in the table!`); // print the numbers of total items in the table
//   } catch (error) {
//     console.error(error); // if error , say error
//   }
// };

// // to retreve the all data of the table
// const getAllTodos = async () => {
//   try {
//     const todos = await Todo.findAll(); // this curly brace come inside the findAll's (){
//     // give condition
//     //   where: {
//     //     comleted: false, // check the condition , is condition is stisfied then only it prints
//     //   },
//     // place in the order how our's choise,
//     // order: [
//     //   ["id", "DESC"], // (1) id , (2) in desorder , mean reverse like {3,2,1}
//     // ],
//     //});
//     const todoList = todos.map((todo) => todo.displayableString()).join("\n"); // takes the data given in the (displaybleString),join to the new line
//     console.log(todoList); // print that list
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getSingleTodo = async () => {
//   try {
//     const todo = await Todo.findOne({
//       // give condition
//       //   where: {
//       //     comleted: false, // check the condition , is condition is stisfied then only it prints
//       //   },
//       // place in the order how our's choise,
//       order: [
//         ["id", "DESC"], // (1) id , (2) in desorder , mean reverse like {3,2,1}
//       ],
//     });

//     console.log(todo.displayableString()); // print that list
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateItem = async (id) => {
//   try {
//     await Todo.update(
//       { completed: true },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// const deleteItem = async (id) => {
//   try {
//     const deletedRawCount = await Todo.destroy({
//       where: {
//         id: id,
//       },
//     });
//     console.log(`Deleted ${deletedRawCount} rows! `);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // this is known  Immediately Invoked Function Expression (IIFE) , mean we don't have to create any variable than call it
// /*
// const run = async () => {
//   await getAllTodos();
//   await countItems();
// }

// run();
//  */

// // (async () => {
// //   // await createTodo(); // call the createTodo()
// //   // await countItems(); // call the countItems()
// //   await getAllTodos(); // call the getAllTodos()
// //   //await getSingleTodo(); // call the getSingleTodo()
// //   // await updateItem(2); // this update the table no.(2) , as completed:"true"
// //   await deleteItem(2); // deleted the table no.(2)
// //   await getAllTodos(); // call the getAllTodos()
// // })();
