const request = require('supertest');
const mongoose = require('mongoose');
require("dotenv").config();
import appPromise from '../app';

import { User } from '../models';

let token = '';
let app;


beforeAll(async () => {
  app = await appPromise;
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /user/signin", () => {
  test("signin test", async () => {
    const res = await request(app).post("/user/signin").send({
      "firstname": "test",
      "lastname": "test",
      "username": "test",
      "password": "Aa123456"
  });
    token = res.body.accessToken;
    expect(res.status).toEqual(200);
    expect(res.body.user.firstname).toEqual("test");
    expect(res.body.user.lastname).toEqual("test");
    expect(res.body.user.username).toEqual("test");
  });
});

describe("POST /user/login", () => {
  test("login test", async () => {
    const res = await request(app).post("/user/login").send({
      username: 'test',
      password: 'Aa123456'
    });
    expect(res.status).toEqual(200);
    expect(res.body.user.firstname).toEqual("test");
    expect(res.body.user.lastname).toEqual("test");
    expect(res.body.user.username).toEqual("test");
  });
});

describe("GET /user/", () => {
  test("get user by token", async () => {
    const res = await request(app).get("/user/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body.user.firstname).toEqual("test");
    expect(res.body.user.lastname).toEqual("test");
    expect(res.body.user.username).toEqual("test");
  });
});

describe("POST /user/update", () => {
  test("update all fields", async () => {
    let res = await request(app).post("/user/update").set({
      accessToken: token,
    }).send({
      user: {
        firstname: "test2",
        lastname: "test2",
        username: 'test2',
      }
    });
    expect(res.status).toEqual(200);
    res = await request(app).get("/user/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body.user.firstname).toEqual("test2");
    expect(res.body.user.lastname).toEqual("test2");
    expect(res.body.user.username).toEqual("test2");
  });
});

describe("POST /user/update/password", () => {
  test("update password", async () => {
    let res = await request(app).post("/user/update/password").set({
      accessToken: token,
    }).send({
      oldPassword: "Aa123456",
      newPassword: "test",
    });
    expect(res.status).toEqual(200);
    res = await request(app).post("/user/login").send({
      username: "test2",
      password: "test",
    });
    expect(res.status).toEqual(200);
    token = res.body.accessToken;
  });
});