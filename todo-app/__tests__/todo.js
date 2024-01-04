const request = require("supertest");

const db = require("../models/index");
// const { DESCRIBE } = require("sequelize/types/query-types");
const app = require("../app");

let server, agent;

describe("Todo test suite", () => {
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
  // to define a todo by id
  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const response = await agent.post("/todos").send({
      title: "Buy Milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(response.statusCode).toBe(302); //302 is success code for http redirect

    // expect(response.statusCode).toBe(200);
    // expect(response.header["content-type"]).toBe(
    //   "application/json; charset=utf-8"
    // );
    // const parsedResponse = JSON.parse(response.text);
    // expect(parsedResponse.id).toBeDefined();
  });

  //update markAsCompleted as "true"
  // test("Mark a todo as complete", async () => {
  //   const response = await agent.post("/todos").send({
  //     title: "Buy Milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });
  //    const parsedResponse = JSON.parse(response.text);
  //    const todoID = parsedResponse.id;

  //   expect(parsedResponse.completed).toBe(false);

  //   const markCompleteResponse = await agent
  //     .put(`/todos/${todoID}/markAsCompleted`)
  //     .send();
  //   const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
  //   expect(parsedUpdateResponse.completed).toBe(true);
  // });

  // test("Fetches all todos in the database using /todos endpoint", async () => {
  //   await agent.post("/todos").send({
  //     title: "Buy xbox",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });
  //   await agent.post("/todos").send({
  //     title: "Buy ps3",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });

  //   //Getting all todos and checking the length of parsedResponse
  //   const response = await agent.get("/todos");
  //   const parsedResponse = JSON.parse(response.text);
  //   expect(parsedResponse.length).toBe(4);
  //   expect(parsedResponse[3]["title"]).toBe("Buy ps3"); //Checking Is Index[1] is Same or not
  // });

  // test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
  //   const sent = await agent.post("/todos").send({
  //     title: "Buy milk",
  //     dueDate: new Date().toISOString(),
  //     completed: false,
  //   });

  //   const parsedResponse = JSON.parse(sent.text);
  //   const ID = parsedResponse.id;

  //   const DeletedResponse = await agent.delete(`/todos/${ID}`);
  //   expect(Boolean(DeletedResponse.text)).toBe(true);
  // });
});
