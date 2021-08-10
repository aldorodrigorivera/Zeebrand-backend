/* eslint-disable no-undef */
const request = require("supertest");
const baseAuthURL = "http://localhost:5001/zebrands-rivera/us-central1/app/auth";

describe("URL =/singup :: SINGUP", () => {
  test("Singup with success case: email, password and name", async () => {
    const id = new Date().getTime();
    const success = {
      name: `${id} testZeebrand`,
      email: `test${id}@test.com`,
      password: "testtest",
    };
    const response = await request(baseAuthURL)
        .post("/singup")
        .send(success);
    expect(response.statusCode).toBe(200);
  });

  test("Singup with error case: User already exists", async () => {
    const userRepeted = {
      name: "test",
      email: "test@test.com",
      password: "testtest",
    };
    const response = await request(baseAuthURL)
        .post("/singup")
        .send(userRepeted);
    expect(response.statusCode).toBe(400);
  });

  test("Singup with error case: Bad name", async () => {
    const badCredentials = {
      name: "",
      email: "robot@test.com",
      password: "testtest",
    };
    const response = await request(baseAuthURL)
        .post("/singup")
        .send(badCredentials);
    expect(response.statusCode).toBe(400);
  });

  test("Singup with error case: Bad email", async () => {
    const badCredentials = {
      name: "tt",
      email: "robottestcom",
      password: "testtest",
    };
    const response = await request(baseAuthURL)
        .post("/singup")
        .send(badCredentials);
    expect(response.statusCode).toBe(400);
  });

  test("Singup with error case: Bad password", async () => {
    const id = new Date().getTime();
    const badCredentials = {
      name: `${id} testZeebrand`,
      email: `test${id}@test.com`,
      password: "tt",
    };
    const response = await request(baseAuthURL)
        .post("/singup")
        .send(badCredentials);
    expect(response.statusCode).toBe(400);
  });
});
