/* eslint-disable max-len */
/* eslint-disable no-undef */
const request = require("supertest");
const baseAuthURL = "http://localhost:5001/zebrands-rivera/us-central1/app/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imp3MmhydkdFZEwiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImF1ZGllbmNlIjoiWmVlYnJhbmRzIiwiaWF0IjoxNjI4NjQ0Mjg3LCJleHAiOjE2Mjg2NDYwODd9.AOqjV6TUpli8VXnWnVC6MMuIgZnzMjbWiGtS4ZHjFnY";


describe("URL =/api :: API Test", () => {
  test("/products :: List all products", async () => {
    const response = await request(baseAuthURL)
        .get("/products")
        .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test("/products/ID :: Get product", async () => {
    const response = await request(baseAuthURL)
        .get("/products/AnhJ4fXM4s")
        .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test("/products/ID/delete :: Delete product", async () => {
    const response = await request(baseAuthURL)
        .post("/products/AnhJ4fXM4s/delete")
        .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  test("/products/ID/update :: Update product", async () => {
    const response = await request(baseAuthURL)
        .post("/products/AnhJ4fXM4s/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          "name": "Updated",
          "price": 100,
          "active": true,
          "brand": "Apple",
          "tag": ["Computer", "Dev"],
          "url": "updatedUrl",
        });
    expect(response.statusCode).toBe(200);
  });
});
