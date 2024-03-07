/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
//  const { request, response } = require("express");
const express = require("express"); // import express module
const app = express(); // create app inside the express module
const { Todo, User } = require("./models"); // for the todo work we connect to the "models"
const path = require("path");
const bodyParser = require("body-parser"); // for the work "request.body" of (app.post)
var csrf = require("tiny-csrf");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));
app.set("views", path.join(__dirname, "views"));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs"); // it calls file who have ejs and set that as view engine
const { error } = require("console");

app.use(
  session({
    secret: "my-super-secret-key-21728172615261562", // this number is randoum
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

app.use(passport.initialize()); // start the passport use
app.use(passport.session()); // strat the session use

app.use(function (request, response, next) {
  response.locals.messages = request.flash();
  next();
});

// create a "LocalStrategy" that authentitake the user details
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      User.findOne({ where: { email: username } })
        .then(async (user) => {
          const result = await bcrypt.compare(password, user.password); // this compare the pass. in the database to the user's pass in the form of bcrypt maen(Hash)
          if (result) {
            // if result is "true"
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        })
        .catch((error) => {
          return done(error);
        });
    },
  ),
);

// the "serializeUser" it save the "user" data in the session
passport.serializeUser((user, done) => {
  console.log("serializing user in the session", user.id);
  done(null, user.id);
});

// it recreate the byte-memory to retreave the user data given in the "serializeUser"
passport.deserializeUser((id, done) => {
  User.findByPk(id) // ne search the id by "findByPk" in the databse
    .then((user) => {
      // if id gate then send the user
      done(null, user);
    })
    .catch((error) => {
      // if id not found then sent error
      done(error, null);
    });
});

/* Syntax of route :
    app.METHOD(PATH,HANDLER)                   // METHOD always in small letter like , get,delete,post,etc.
    Or                        // path is the way in which client is connect with server , handlerexecute the work when "method" and "path" is match
    app.METHOD(path,Callback [,Callback ...])  // callback take two parameter (request, response) , request take the request , respose do the work in the body of route
*/

// this "connect-flash" for the login page
app.post(
  "/session",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (request, response) {
    console.log(request.user);
    response.redirect("/todos2");
  },
);

app.get("/", async function (request, response) {
  if (request.isAuthenticated()) {
    response.redirect("/todos2"); // this is for if user direct come out from URL without logout , then it redirect to the "todos2" page , so without logout user can't go from this page from direct URL
  } else {
    response.render("index", {
      title: "Todo Application",
      csrfToken: request.csrfToken(),
    });
  }

  // response.send("Hello World");
  // const allTodo = await Todo.getTodo();
  // const overdueTodos = await Todo.overdue();
  // const dueTodayTodos = await Todo.dueToday();
  // const dueLaterTodos = await Todo.dueLater();
  // const completed = await Todo.completedItem();
  // // const markAsCompleted = await Todo.markAsCompleted();
  // // const Delete = await Todo.deletetodo({ where: { id: Todo.id } })

  // if (request.accepts("html")) {
  //   response.render("index", {
  //     title: "Todo Application",
  //     allTodo,
  //     overdueTodos,
  //     dueTodayTodos,
  //     dueLaterTodos,
  //     completed,
  //     csrfToken: request.csrfToken(),
  //   });
  // } else {
  //   response.json({
  //     allTodo,
  //     overdueTodos,
  //     dueTodayTodos,
  //     dueLaterTodos,
  //     completed,
  //   });
  // }
});

// this is for "signup" web page
app.get("/signup", (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect("/todos2"); // this is for if user direct come out from URL without logout , then it redirect to the "todos2" page , so without logout user can't go from this page from direct URL
  } else {
    response.render("signup", {
      title: "Signup",
      csrfToken: request.csrfToken(),
    });
  }
});

// this is for "login" web page
app.get("/login", (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect("/todos2"); // this is for if user direct come out from URL without logout , then it redirect to the "todos2" page , so without logout user can't go from this page from direct URL
  } else {
    response.render("login", {
      title: "Todo Application",
      csrfToken: request.csrfToken(),
    });
  }
});

app.post("/users", async (request, response) => {
  const { firstName, lastName, email, password } = request.body; // we take this {..} parameters from the "request.body"
  // check below detais is empty or not
  if (!firstName || !password || !email) {
    request.flash(
      "error", // if empty show error , display below message ".."
      "firstname , Password and Email are must be required!",
    );
    // if this detalis is not filled then redirect to the "signup" page
    return response.redirect("/signup");
  }

  // Hash password using bcrypt , knowone can read our password from the database , exp. my pass. is "123" it convert into "$2b$10$Xz1pJnB4fJ5mCV8hQbIPH.wLbf3UdhjeVgSPXV3Ho1EPAoxIQNTYC"
  const hashedPwd = await bcrypt.hash(request.body.password, saltRounds);
  // console.log(hashedPwd);

  // have to create the user here
  try {
    const user = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPwd,
    });
    request.login(user, (err) => {
      if (err) {
        console.log(err);
      }
      response.redirect("/todos2");
    });
  } catch (error) {
    console.log(error);
  }
});

// connect "connectEnsureLogin.ensureLoggedIn()" to the "todos2" page gor authentication that only login user can access this page
app.get(
  "/todos2",
  connectEnsureLogin.ensureLoggedIn(), // it ensure that , if user is loged-in only then web page is shown
  async function (request, response) {
    // response.send("Hello World");
    const loggedInUser = request.user.id; // this take the user id , if corrent id is same , only then it shows theirs id's todo
    const allTodo = await Todo.getTodo(loggedInUser);
    const overdueTodos = await Todo.overdue(loggedInUser);
    const dueTodayTodos = await Todo.dueToday(loggedInUser);
    const dueLaterTodos = await Todo.dueLater(loggedInUser);
    const completed = await Todo.completedItem(loggedInUser);
    // const markAsCompleted = await Todo.markAsCompleted();
    // const Delete = await Todo.deletetodo({ where: { id: Todo.id } })

    if (request.accepts("html")) {
      response.render("todos2", {
        title: "Todo Application",
        allTodo,
        overdueTodos,
        dueTodayTodos,
        dueLaterTodos,
        completed,
        csrfToken: request.csrfToken(),
      });
    } else {
      response.json({
        allTodo,
        overdueTodos,
        dueTodayTodos,
        dueLaterTodos,
        completed,
      });
    }
  },
);

app.post(
  "/session",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), // if user's details is incorrect it ,back to the "login" page
  (request, response) => {
    console.log(request.user);
    // if the details of user is correct
    response.redirect("/todos2");
  },
);

app.get("/signout", (request, response, next) => {
  // signout
  request.logout((err) => {
    if (err) {
      return next(err); // if "err" return "err"
    }
    response.redirect("/"); // if not "err" redirect to the root web page
  });
});

// it like as , PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put(
  "/todos/:id/markAsCompleted",
  connectEnsureLogin.ensureLoggedIn(), // it ensure that , if user is loged-in only then web page is shown
  async (request, response) => {
    // console.log("We have to update the todo with ID", request.params.id); //this update our todo with the ID
    const todo = await Todo.findByPk(request.params.id); // this "findByPk()" take ansingle ID which is given in the (..)

    try {
      const status = todo.completed;
      // aplied the logic og toggle the completion
      const updatedTodo = await todo.toggleCompletionStatus(status); // call the "markAsCompleted()"
      return response.json(updatedTodo); // return the "updatedTodo" in the response
    } catch (error) {
      console.log(error);
      return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
    }
  },
);

app.delete(
  "/todos/:id",
  connectEnsureLogin.ensureLoggedIn(), // it ensure that , if user is loged-in only then web page is shown

  async (request, response) => {
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
  },
);

app.post(
  "/todos",
  connectEnsureLogin.ensureLoggedIn(), // it ensure that , if user is loged-in only then web page is shown
  async (request, response) => {
    // use async for to give the condition which will work first
    // console.log("Creating a todo", request.body); // this post the our todo , that we are created
    // Todo
    // console.log(request.user);
    const { title, dueDate } = request.body; // taking this parameters {..} from body
    // check title nd duedate are empty
    if (!dueDate || !title) {
      // Flash an error message
      request.flash("error", "Todo Title and Duedate both are required!");
      // Redirect to the same page or a designated error page
      return response.redirect("/todos2");
    } else if (title.length < 5) {
      // check if title length is less than 5
      // Flash an error message
      request.flash("error", "todo tile should be atleast 5 characters long!");
      // Redirect to the same page or a designated error page
      return response.redirect("/todos2");
    }
    try {
      await Todo.addTodo({
        // before hear .create , after we create todo in the (models/todo.js) we call it from there
        title: request.body.title,
        dueDate: request.body.dueDate,
        userId: request.user.id,
        // completed: false,
        //create an todo , give await for it done first
      });
      return response.redirect("/todos2"); // return the "todo" in the response
    } catch (error) {
      console.log(error);
      return response.status(422).json(error); // status(422) says "unprosaseble entry" , mean there is an "error"
    }
  },
);

// app.get("/todos", async function (request, response) {
//   try {
//     const allTodo = await Todo.getTodo();
//     const overdueTodos = await Todo.overdue();
//     const dueTodayTodos = await Todo.dueToday();
//     const dueLaterTodos = await Todo.dueLater();
//     const completed = await Todo.completedItem();
//     response.json({
//       allTodo,
//       overdueTodos,
//       dueTodayTodos,
//       dueLaterTodos,
//       completed,
//     });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/todos/:id", async function (request, response) {
//   try {
//     const todo = await Todo.findByPk(request.params.id);
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// this is for onine render
// app.put("/todos/:id", async function (request, response) {
//   const todo = await Todo.findByPk(request.params.id);
//   try {
//     const updatedTodo = await todo.markAsCompleted(true);
//     return response.json(updatedTodo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

// this is for online render

module.exports = app;
