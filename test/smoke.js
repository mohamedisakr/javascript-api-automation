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
  /*
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
  */

  /*
  it("POST /users", () => {
    request
      .post("users")
      .set("Authorization", `Bearer ${token}`)
      .send(coti)
      // .expect(200, done)
      .then((res) => {
        console.log(res.body);
        // expect(res.status).to.be.eq(201);
        expect(res.body.data).to.deep.include(coti);
      });
  });
  */

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
      // .expect(200, done)
      .then((res) => {
        console.log(res.body);
        // expect(res.status).to.be.eq(201);
        expect(res.body.data).to.deep.include(user);
      });
  });

  // it("gets the test endpoint", async (done) => {
  //   const response = await request.get(`users?access-token=${token}`);
  //   console.log(`Status code : ${response.status}`);
  //   expect(response.status).toBe(200);
  //   done();
  // });
});

// it("GET /users", async (done) => {
//   const response = await request
//     .get(`users?access-token=${token}`)
//     .end((err, response) => {
//       expect(response.status).to.be.eq(200);
//       expect(response.body.data).to.not.be.empty;done();
// done()
//     });
// });
//===============
// it("gets the test endpoint", async (done) => {
//   // const response = await request.get(`users?access-token=${token}`);
//   // console.log(`Response : ${response}`);
//   request.get(`users?access-token=${token}`).end((err, response) => {
//     expect(response.status).to.be.eq(200);
//     // expect(response.body.message).toBe("pass!");
//     done();
//   });
// });

// request.get(`users?access-token=${token}`).end((err, res) => {
//   //   console.log(err);
//   //   console.log(res.body);
//   expect(res.body.data).to.be.empty;
// done();
// });
