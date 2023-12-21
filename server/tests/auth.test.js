const request = require('supertest');
require("dotenv").config();
import appPromise from '../app';

let token = '';
let app;

beforeAll(async () => {
  app = await appPromise;
  const res = await request(app).post("/user/login").send({
    username: 'AfekC',
    password: 'Aa123456'
  });
  token = res.body.accessToken;
});

describe("POST /user/signin", () => {
  test("login test", async () => {
    const res = await request(app).post("/user/login").send({
      username: 'AfekC',
      password: 'Aa123456'
    });
    expect(res.status).toEqual(200);
  });
});

describe("POST /user/login", () => {
  test("login test", async () => {
    const res = await request(app).post("/user/login").send({
      username: 'AfekC',
      password: 'Aa123456'
    });
    expect(res.status).toEqual(200);
  });
});