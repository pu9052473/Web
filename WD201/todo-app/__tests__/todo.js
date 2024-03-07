/* eslint-disable no-undef */
const request = require("supertest");
var cheerio = require("cheerio");
const db = require("../models/index");
// const { DESCRIBE } = require("sequelize/types/query-types");
const app = require("../app");

let server, agent;

function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  const csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("sign up", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "user A",
      email: "user.a@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });
    expect(res.statusCode).toBe(302);
  });

  test("Sign out", async () => {
    let res = await agent.get("/todos2");
    expect(res.statusCode).toBe(200);
    res = await agent.get("/signout");
    expect(res.statusCode).toBe(302);
    res = await agent.get("/todos2");
    expect(res.statusCode).toBe(302);
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const agent = request.agent(server); // we created a login function that have a "const login = async (agent, username, password)"
    await login(agent, "user.a@test.com", "12345678"); // so we here authenticate that
    const res = await agent.get("/todos2");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302); //302 is success code for http redirect
  });

  test("Toogles completion status)if true then do false and vice versa", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
    let res = await agent.get("/todos2");
    let csrfToken = extractCsrfToken(res);
    //creating todo
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      _csrf: csrfToken,
    });
    //getting all todos from database
    const groupOfTodos = await agent
      .get(`/todos2`) // we get all the todo wich we are passed in the only test , mean only in the "todo.js ...\__tests__"
      .set("Accepts", "application/json"); //This method is used to set HTTP headers for the request.

    const contentType = groupOfTodos.headers["content-type"]; // we do this line for take the parameter which is in the "html" form , then include the "JSON" form in the next line
    if (contentType.includes("application/json")) {
      const parsedgroupOfTodos = JSON.parse(groupOfTodos.text);
      //counting todo to find last added todo
      const dueTodaycount = parsedgroupOfTodos.dueTodayTodos.length;
      //getting last todo from array of all todos
      const lastTodo = parsedgroupOfTodos.dueTodayTodos[dueTodaycount - 1]; //getting last todo array
      const booleanValue = lastTodo.completed; //initial value

      console.log("Last Todo", lastTodo);

      res = await agent.get("/todos2");
      csrfToken = extractCsrfToken(res);

      const updatedresponse1 = await agent
        .put(`/todos/${lastTodo.id}/markAsCompleted`)
        .send({
          completed: booleanValue,
          _csrf: csrfToken,
        });
      const updatedparsedResponse = JSON.parse(updatedresponse1.text);
      const oppositeboolean = !booleanValue; //after updated value
      console.log("OppositeBoolean", oppositeboolean);
      expect(updatedparsedResponse.completed).toBe(oppositeboolean);
    }
  });

  test("delete a todo", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");
    let res = await agent.get("/todos2");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      _csrf: csrfToken,
    });

    const groupOfTodos = await agent
      .get(`/todos2`)
      .set("Accepts", "application/json");

    const contentType = groupOfTodos.headers["content-type"]; // we do this line for take the parameter which is in the "html" form , then include the "JSON" form in the next line
    if (contentType.includes("application/json")) {
      const parsedgroupOfTodos = JSON.parse(groupOfTodos.text);
      expect(parsedgroupOfTodos.dueTodayTodos).toBeDefined();

      const dueTodaycount = parsedgroupOfTodos.dueTodayTodos.length;
      const lastTodo = parsedgroupOfTodos.dueTodayTodos[dueTodaycount - 1];

      res = await agent.get("/todos2");
      csrfToken = extractCsrfToken(res);

      const deletedResponse = await agent.delete(`todos/${lastTodo.id}`).send({
        _csrf: csrfToken,
      });
      expect(deletedResponse.statusCode).toBe(200);
    }
  });

  // test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
  //     //adding Reponse
  //     const response = await agent.post("/todos").send({
  //       title: "task L6 test route",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });

  //     //Parsing the Respose To check If Added or not
  //     const parsedResponse = JSON.parse(response.text);
  //     expect(parsedResponse.id).toBeDefined();
  //     const todoID = parsedResponse.id;
  //     // expect(parsedResponse.length).toBe(1);

  //     //Deleting response and checking that it is returning true or not
  //     const DeletedResponse = await agent.delete(`/todos/${todoID}`).send();
  //     expect(DeletedResponse.statusCode).toBe(200);

  //     const parsedUpdateResponse = JSON.parse(DeletedResponse.text);
  //     expect(parsedUpdateResponse).toBe(true);

  //     //geting All Response to check length of response
  //     const GetAllResponse = await agent.get("/todos");
  //     const parsedGetAllResponse = JSON.parse(GetAllResponse.text);
  //     expect(parsedGetAllResponse.length).toBe(4);
  //   }, 10000);

  // // to define a todo by id
  // test("Creates a todo and responds with json at /todos POST endpoint", async () => {
  //   const response = await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.header["content-type"]).toBe(
  //     "application/json; charset=utf-8"
  //   );
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.id).toBeDefined();
  // });

  // // update markAsCompleted as "true"
  // test("Marks a todo with the given ID as complete", async () => {
  //   const response = await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });
  //   const parsedResponse = JSON.parse(response.text);
  //   const todoID = parsedResponse.id;

  //   expect(parsedResponse.completed).toBe(false);

  //   const markCompleteResponse = await agent
  //     .put(`/todos/${todoID}/markASCompleted`)
  //     .send();
  //   const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
  //   expect(parsedUpdateResponse.completed).toBe(true);
  // });

  //   test("Fetches all todos in the database using /todos endpoint", async () => {
  //     await agent.post("/todos").send({
  //       title: "Buy xbox",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });
  //     await agent.post("/todos").send({
  //       title: "Buy ps3",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });

  //     //Getting all todos and checking the length of parsedResponse
  //     const response = await agent.get("/todos");
  //     const parsedResponse = JSON.parse(response.text);
  //     expect(parsedResponse.length).toBe(4);
  //     expect(parsedResponse[3]["title"]).toBe("Buy ps3"); //Checking Is Index[1] is Same or not
  //   });
});
