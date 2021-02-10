// import { describe } from "mocha";
import suprttest from "supertest";
import { expect } from "chai";
import "@babel/polyfill";
const request = suprttest("https://gorest.co.in/public-api/");
const token =
  "f23c96ab955134d34fb15a05c891320a81c0a6a309c9f481604e380d19bef872";
let guid = Date.now();

const coti = {
  email: `coti${guid}@mit.edu`,
  name: `coti${guid}`,
  gender: "Female",
  status: "Active",
};

//
describe("users", () => {
  let userId = 0;

  describe("POST", () => {
    it("add new user", () => {
      request
        .post("users")
        .set("Authorization", `Bearer ${token}`)
        .send(coti)
        .then((res) => {
          // console.log(res.body);
          // expect(res.status).to.be.eq(201);
          userId = res.body.data.id;
          // console.log(userId);
          expect(res.body.data).to.deep.include(coti);
        });
    });
  });

  describe("GET", () => {
    it("respond with json containing a list of all users", (done) => {
      request.get(`users?access-token=${token}`).expect(200, done);
    });

    it("respond with json containing a single user, GET /users/:id", () => {
      request
        .get(`users/${userId}/?access-token=${token}`)
        .set("Accept", "application/json")
        // .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(userId);
        });
      // .expect(200, done);
    });
  });

  describe("PUT", () => {
    it("/users/:id", () => {
      const user = {
        id: userId,
        name: "coti", //"Ms. Gautami Acharya",
        email: "coti123@mit.edu", //"acharya_ms_gautami@orn.io",
        gender: "Female",
        status: "Active",
      };

      request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(user)
        .then((res) => {
          // console.log(res.body);
          // expect(res.status).to.be.eq(201);
          expect(res.body.data).to.deep.include(user);
        });
    });
  });

  describe("DELETE", () => {
    it("/users/:id", () => {
      request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
          // console.log(res.body);
          // expect(res.status).to.be.eq(204);
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
});
