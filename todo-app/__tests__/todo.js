const request = require("supertest");

const db = require("../models/index");
// const { DESCRIBE } = require("sequelize/types/query-types");
const app = require("../app");

let server, agent;

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
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

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(302); //302 is success code for http redirect
  });

  test("Toogles completion status)if true then do false and vice versa", async () => {
    //  let res = await agent.get("/");
    // let token = extractCsrf(res);
    //creating todo
    await agent.post("/todos").send({
      title: "check toggle of completion",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      // _csrf: token,
    });
    //getting all todos from database
    const groupOfTodos = await agent
      .get(`/todos`) // we get all the todo wich we are passed in the only test , mean only in the "todo.js ...\__tests__"
      .set("Accepts", "application/json"); //This method is used to set HTTP headers for the request.
    const parsedgroupOfTodos = JSON.parse(groupOfTodos.text);
    //counting todo to find last added todo
    const dueTodaycount = parsedgroupOfTodos.dueTodayTodos.length;
    //getting last todo from array of all todos
    const lastTodo = parsedgroupOfTodos.dueTodayTodos[dueTodaycount - 1]; //getting last todo array
    const booleanValue = lastTodo.completed; //initial value

    console.log("Last Todo", lastTodo);

    // res = await agent.get("/");
    // token = extractCsrf(res);

    const updatedresponse1 = await agent
      .put(`/todos/${lastTodo.id}/markAsCompleted`)
      .send({
        completed: booleanValue,
        // _csrf: token,
      });
    const updatedparsedResponse = JSON.parse(updatedresponse1.text);
    const oppositeboolean = !booleanValue; //after updated value
    console.log("OppositeBoolean", oppositeboolean);
    expect(updatedparsedResponse.completed).toBe(oppositeboolean);
  });

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

  //   test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
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
});
