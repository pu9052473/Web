/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
//  const { request, response } = require("express");
const express = require("express"); // import express module
const app = express(); // create app inside the express module
const { Todo } = require("./models"); // for the todo work we connect to the "models"
const path = require("path");
const bodyParser = require("body-parser"); // for the work "request.body" of (app.post)
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Syntax of route :
    app.METHOD(PATH,HANDLER)                   // METHOD always in small letter like , get,delete,post,etc.
    Or                        // path is the way in which client is connect with server , handlerexecute the work when "method" and "path" is match
    app.METHOD(path,Callback [,Callback ...])  // callback take two parameter (request, response) , request take the request , respose do the work in the body of route
*/

app.get("/", async function (request, response) {
  // response.send("Hello World");
  const allTodo = await Todo.getTodo();
  const overdueTodos = await Todo.overdue();
  const dueTodayTodos = await Todo.dueToday();
  const dueLaterTodos = await Todo.dueLater();
  // const markAsCompleted = await Todo.markAsCompleted();
  // const Delete = await Todo.deletetodo({ where: { id: Todo.id } })

  if (request.accepts("html")) {
    response.render("index", {
      allTodo,
      overdueTodos,
      dueTodayTodos,
      dueLaterTodos,
    });
  } else {
    response.json({ allTodo });
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs"); // it calls file who have ejs and set that as view engine

// app.get("/", async (request, response) => {
//   const allTodos = await Todo.getTodos();
//   if (request.accepts("html")) {
//     // if there is an "html" inside the web page then ,
//     response.render("index", {
//       // takes render the index
//       allTodos, // call allTodos tha contais all todo list
//     });
//   } else {
//     response.json({
//       // else there is an json from the postman then also
//       allTodos, // call allTodos tha contais all todo list
//     });
//   }
// });

app.post("/todos", async (request, response) => {
  // use async for to give the condition which will work first
  console.log("Creating a todo", request.body); // this post the our todo , that we are created
  // Todo
  try {
    const todo = await Todo.addTodo(request.body);
    // before hear .create , after we create todo in the (models/todo.js) we call it from there
    title: request.body.title;
    dueDate: request.body.dueDate;
    // completed: false,
    //create an todo , give await for it done first
    return response.redirect("/"); // return the "todo" in the response
  } catch (error) {
    console.log(error);
    return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
  }
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

app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// // it like as , PUT http://mytodoapp.com/todos/123/markAsCompleted
// app.put("/todos/:id/markAsCompleted", async (request, response) => {
//   // console.log("We have to update the todo with ID", request.params.id); //this update our todo with the ID
//   const todo = await Todo.findByPk(request.params.id); // this "findByPk()" take ansingle ID which is given in the (..)

//   try {
//     const updatedTodo = await todo.markAsCompleted(); // call the "markAsCompleted()"
//     return response.json(updatedTodo); // return the "updatedTodo" in the response
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
//   }
// });

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted(true);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by ID:", request.params.id);

  try {
    const deletedItem = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });
    response.send(deletedItem ? true : false);
  } catch (error) {
    console.error(error);
    return response.status(442).json(error);
  }
});

// app.listen(3000, () => {
//   // the server port at this present
//   console.log("Started express server at port 3000");
// });

module.exports = app;
