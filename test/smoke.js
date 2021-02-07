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
  it("respond with json containing a list of all users", (done) => {
    request.get(`users?access-token=${token}`).expect(200, done);
  });

  it("respond with json containing a single user, GET /user/:id", (done) => {
    request
      .get(`users/6/?access-token=${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("POST /users", () => {
    request
      .post("users")
      .set("Authorization", `Bearer ${token}`)
      .send(coti)
      .then((res) => {
        console.log(res.body);
        // expect(res.status).to.be.eq(201);
        expect(res.body.data).to.deep.include(coti);
      });
  });

  it("PUT /users/:id", () => {
    const user = {
      id: 69,
      name: "coti", //"Ms. Gautami Acharya",
      email: "coti123@mit.edu", //"acharya_ms_gautami@orn.io",
      gender: "Female",
      status: "Active",
    };

    request
      .put("users/69")
      .set("Authorization", `Bearer ${token}`)
      .send(user)
      .then((res) => {
        console.log(res.body);
        // expect(res.status).to.be.eq(201);
        expect(res.body.data).to.deep.include(user);
      });
  });

  it.only("DELETE /users/:id", () => {
    request
      .delete("users/69")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        console.log(res.body);
        expect(res.status).to.be.eq(204);
        expect(res.body.data).to.be.eq(null);
      });
  });
});
