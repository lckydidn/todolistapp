const request = require("supertest");
const app = require("./app.js");

const dummy_task = {
  title: "Task Uji1",
  task: "Testing Todos",
  completed: false,
};

describe("Todos API", () => {
  let email = "chixia@admin.com";
  let password = "admin123";

  // Get All tasks
  it("GET /api/todos - success", async () => {
    const res = await request(app)
      .get("/api/todos?page=1")
      .set("email", email)
      .set("password", password);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  // Get One Task
  it("GET /api/todos/:id - success", async () => {
    const res = await request(app)
      .get("/api/todos/2")
      .set("email", email)
      .set("password", password);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  // Create Task
  it("POST /api/todos - success", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("email", email)
      .set("password", password)
      .send(dummy_task);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("postTask");
  });

  // Update Task
  it("PUT /api/todos/:id - success", async () => {
    const res = await request(app)
      .put("/api/todos/3")
      .set("email", email)
      .set("password", password)
      .send(dummy_task);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("updatedTask");
  });

  // Delete Task
  it("DELETE /api/todos/:id - success", async () => {
    const res = await request(app)
      .delete("/api/todos/4")
      .set("email", email)
      .set("password", password);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");
  });
});
