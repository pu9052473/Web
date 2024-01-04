/* eslint-disable no-unused-vars */
//  const { request, response } = require("express");
const express = require("express"); // import express module
const app = express(); // create app inside the express module
const { Todo } = require("./models"); // for the todo work we connect to the "models"
// const path = require("path");
const bodyParser = require("body-parser"); // for the work "request.body" of (app.post)
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Syntax of route :
    app.METHOD(PATH,HANDLER)                   // METHOD always in small letter like , get,delete,post,etc.
    Or                        // path is the way in which client is connect with server , handlerexecute the work when "method" and "path" is match
    app.METHOD(path,Callback [,Callback ...])  // callback take two parameter (request, response) , request take the request , respose do the work in the body of route
*/

// app.set("view engine", "ejs"); // it calls file who have ejs and set that as view engine

// app.get("/", (request, response) => {
//   response.render("index"); // it et the data from the ejs index file take the all content and set into the wab page
// });

app.get("/", (request, response) => {
  // this is root route for this express app
  response.send("Hello World");
  // console.log("Todo List", request.body);
});

app.get("/todos", async (request, response) => {
  console.log("Processing list of all Todos ...");

  try {
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  // use async for to give the condition which will work first
  // console.log("Creating a todo", request.body); // this post the our todo , that we are created
  // Todo
  try {
    const todo = await Todo.addTodo(request.body);
    // before hear .create , after we create todo in the (models/todo.js) we call it from there
    // title: request.body.title,
    // dueDate: request.body.dueDate,
    // completed: false,
    //create an todo , give await for it done first
    return response.json(todo); // return the "todo" in the response
  } catch (error) {
    console.log(error);
    return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
  }
});

// it like as , PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  // console.log("We have to update the todo with ID", request.params.id); //this update our todo with the ID
  const todo = await Todo.findByPk(request.params.id); // this "findByPk()" take ansingle ID which is given in the (..)

  try {
    const updatedTodo = await todo.markAsCompleted(); // call the "markAsCompleted()"
    return response.json(updatedTodo); // return the "updatedTodo" in the response
  } catch (error) {
    console.log(error);
    return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
  }
});

app.delete("/todos/id/deleteitem", async (request, response) => {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  const ID = request.params.id;
  const todo = await Todo.findByPk(request.params.id);

  try {
    await todo.destroy();
    console.log(`Item with id:${ID} Deleted`);
    response.send.true;
  } catch (error) {
    console.log(error);
    response.send.false;
  }
});

// app.listen(3000, () => {
//   // the server port at this present
//   console.log("Started express server at port 3000");
// });

module.exports = app;
