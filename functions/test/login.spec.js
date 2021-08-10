/* eslint-disable no-undef */
const request = require("supertest");
const baseAuthURL = "http://localhost:5001/zebrands-rivera/us-central1/app/auth";

describe("URL =/login :: LOGIN", () => {
  test("Login with success case: email, password and audience", async () => {
    const success = {
      audience: "Zeebrands",
      email: "test@test.com",
      password: "test",
    };
    const response = await request(baseAuthURL)
        .post("/login")
        .send(success);
    expect(response.statusCode).toBe(200);
  });

  test("Login with error case: Bad Audience", async () => {
    const badAudience = {
      audience: "test",
      email: "test@test.com",
      password: "test",
    };
    const response = await request(baseAuthURL)
        .post("/login")
        .send(badAudience);
    expect(response.statusCode).toBe(401);
  });

  test("Login with error case: Bad Credentials", async () => {
    const badCredentials = {
      audience: "test",
      email: "robot@test.com",
      password: "test",
    };
    const response = await request(baseAuthURL)
        .post("/login")
        .send(badCredentials);
    expect(response.statusCode).toBe(401);
  });
});
