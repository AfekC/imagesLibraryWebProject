/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import initApp from '../app';
import dotenv from 'dotenv';
import User from '../models/user.model';
import UserToken from '../models/userToken.model';
import Image from '../models/image.model';
import fs from "fs";

dotenv.config();


let cookie = null;
let app;
let image = {};


beforeAll(async () => {
  app = await initApp();
  await User.deleteMany();
  await Image.deleteMany();
  await UserToken.deleteMany();
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /user/signup", () => {
  test("signin test", async () => {
    const res = await request(app).post("/user/signup").send({
      firstname: "test",
      lastname: "test",
      username: "test",
      password: "Aa123456"
  });
    cookie = res.get('Set-Cookie');
    image.creator = { _id: cookie };
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
    console.log(res.body, res.status);
    expect(res.status).toEqual(200);
    expect(res.body.firstname).toEqual("test");
    expect(res.body.lastname).toEqual("test");
    expect(res.body.username).toEqual("test");
  });
});

describe("GET /user/", () => {
  test("get user by token", async () => {
    const res = await request(app).get("/user/").set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(200);
    expect(res.body.firstname).toEqual("test");
    expect(res.body.lastname).toEqual("test");
    expect(res.body.username).toEqual("test");
  });
});

describe("POST /user/update", () => {
  test("update all fields", async () => {
    let res = await request(app).post("/user/update").set('Cookie', [...cookie]).send({
      user: {
        firstname: "test2",
        lastname: "test2",
        username: 'test2',
      }
    });
    expect(res.status).toEqual(200);
    res = await request(app).get("/user/").set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(200);
    expect(res.body.firstname).toEqual("test2");
    expect(res.body.lastname).toEqual("test2");
    expect(res.body.username).toEqual("test2");
  });
});

describe("POST /user/update/image", () => {
  test("update all fields", async () => {
    let res = await request(app).post("/user/update/image").set('Content-Type', 'multipart/form-data').attach('file', process.env.baseLibraryPath + 'node.png').set('Cookie', [...cookie]);
    expect(res.status).toEqual(200);
    res = await request(app).get("/user/").set('Cookie', [...cookie]).send();
    expect(!!res.body.image).toEqual(true);
  });
});

describe("GET /user/id/:id", () => {
  test("get user by token", async () => {
    const res = await request(app).get("/user/").set('Cookie', [...cookie]).send();
    const idRes = await request(app).get(`/user/id/${res.body._id}`).set('Cookie', [...cookie]).send();
    expect(idRes.status).toEqual(200);
    expect(res.body.firstname).toEqual("test2");
    expect(res.body.lastname).toEqual("test2");
    expect(res.body.username).toEqual("test2");
  });
});

describe("logout", () => {
  test("log in and out and refresh token", async () => {
    let res = await request(app).post("/user/login").set('Cookie', [...cookie]).send({
      username: 'test2',
      password: 'Aa123456'
    });
    expect(res.status).toEqual(200);
    cookie = res.get('Set-Cookie');

    res = await request(app).get("/user/").set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(200);

    res = await request(app).post("/user/refreshtoken").set('Cookie', [...cookie]).send();
    cookie = res.get('Set-Cookie');
    expect(res.status).toEqual(200);

    res = await request(app).post("/user/logout").set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(200);

    res = await request(app).post("/user/refreshtoken").set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(400);
  });
});

describe("Post /image/upload", () => {
  test("get all empty", async () => {
    let res = await request(app).post("/image/upload").set('Content-Type', 'multipart/form-data').set('Cookie', [...cookie])
        .attach('file', process.env.baseLibraryPath + 'node.png').field('caption', 'caption');
    expect(res.body.name).toEqual('caption');
  });
});

describe("get all images", () => {
  test("post image and comments", async () => {
    let res = await request(app).get("/image/").set('Cookie', [...cookie]).send();
    expect(res.body.length !== 0).toEqual(true);
  });
});

describe("add comments", () => {
  test("add comments", async () => {
    let res = await request(app).get("/image/").set('Cookie', [...cookie]).send();
    res = await request(app).post("/image/comments").set('Cookie', [...cookie]).send({ imageId: res.body[0]._id , text: 'king' });
    expect(res.body.length !== 0).toEqual(true);
  });
});

describe("get comment by image id", () => {
  test("get comment by image id", async () => {
    let res = await request(app).get("/image/").set('Cookie', [...cookie]).send();
    res = await request(app).get(`/image/${res.body[0]._id}/comments`).field('_id', res.body[0]._id).set('Cookie', [...cookie]);
    expect(res.body.length !== 0).toEqual(true);
  });
});

describe("update image", () => {
  test("update image", async () => {
    let res = await request(app).get("/image/").set('Cookie', [...cookie]).send();
    res = await request(app).post(`/image/${res.body[0]._id}/update`).set('Content-Type', 'multipart/form-data')
        .attach('file',process.env.baseLibraryPath + 'node.png' ).field('_id', res.body[0]._id).field('caption', 'King').set('Cookie', [...cookie]);
    expect(res.body.name).toEqual('King');
  });
});

describe("get image by id", () => {
  test("get image by id", async () => {
    let res = await request(app).get("/image/").set('Cookie', [...cookie]).send();
    const currentImageId = res.body[0]._id;
    res = await request(app).get(`/image/${res.body[0]._id}`).set('Cookie', [...cookie]).send();
    expect(res.status).toEqual(200);
    expect(res.body._id).toEqual(currentImageId);
  });
});
