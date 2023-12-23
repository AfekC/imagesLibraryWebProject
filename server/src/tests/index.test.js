/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import initApp from '../app';
import dotenv from 'dotenv';
import User from '../models/user.model';
import UserToken from '../models/userToken.model';
import Image from '../models/image.model';
import { isConstructorDeclaration } from 'typescript';

dotenv.config();


let token = '';
let refreshToken = '';
let app;


beforeAll(async () => {
  app = await initApp();
  await User.deleteMany();
  await Image.deleteMany();
  await UserToken.deleteMany();
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /user/signin", () => {
  test("signin test", async () => {
    const res = await request(app).post("/user/signin").send({
      firstname: "test",
      lastname: "test",
      username: "test",
      password: "Aa123456"
  });
    token = res.body.accessToken;
    refreshToken = res.body.refreshToken;
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
  });
});

describe("logout", () => {
  test("log in and out and refresh token", async () => {
    let res = await request(app).post("/user/login").send({
      username: 'test2',
      password: 'test'
    });
    expect(res.status).toEqual(200);
    token = res.body.accessToken;
    refreshToken = res.body.refreshToken;


    res = await request(app).get("/user/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);

    res = await request(app).post("/user/refreshtoken").set({
      refreshToken,
      accessToken: token,
    }).send();
    token = res.body.accessToken;
    expect(res.status).toEqual(200);

    res = await request(app).post("/user/logout").set({
      accessToken: token,
      refreshToken,
    }).send();
    expect(res.status).toEqual(200);


    res = await request(app).post("/user/refreshtoken").set({
      refreshToken,
    }).send();
    expect(res.status).toEqual(400);
  });
});

describe("GET /image", () => {
  test("get all empty", async () => {
    let res = await request(app).post("/user/login").send({
      username: 'test2',
      password: 'test'
    });
    expect(res.status).toEqual(200);
    token = res.body.accessToken;
    res = await request(app).get("/image/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });
});

describe("upload image", () => {
  test("post image and comments", async () => {
    let res = await request(app).post("/image/upload").set({
      accessToken: token,
    }).send({
      name: 'myImage',
      file: {}
    });
    expect(res.status).toEqual(200);
    const imageId = res.body._id;

    res = await request(app).post(`/image/${imageId}/comments`).set({
      accessToken: token,
    }).send({
      text: 'great picture',
    });
    expect(res.status).toEqual(200);

    res = await request(app).get(`/image/${imageId}/comments`).set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body.comments[0].text).toEqual('great picture');
  });
});

describe("delete image", () => {
  test("delete the posted image", async () => {
    let res = await request(app).get("/image/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body[0].name).toEqual('myImage');

    res = await request(app).delete("/image/" + res.body[0]._id).set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);

    res = await request(app).get("/image/").set({
      accessToken: token,
    }).send();
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });
});
