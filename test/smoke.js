import { expect } from "chai";
import "@babel/polyfill";
import request from "../config/common";
import { coti } from "../fixtures/data";

const token = process.env.TOKEN;

describe("users", () => {
  let userId = 0;

  describe("POST", () => {
    it("add new user", async () => {
      const res = await request
        .post("users")
        .set("Authorization", `Bearer ${token}`)
        .send(coti);
      userId = res.body.data.id;
      expect(res.body.data).to.deep.include(coti);
    });
  });

  describe("GET", () => {
    it("respond with json containing a list of all users", (done) => {
      request.get(`users?access-token=${token}`).expect(200, done);
    });

    it("respond with json containing a single user, GET /users/:id", async () => {
      const res = await request
        .get(`users/${userId}/?access-token=${token}`)
        .set("Accept", "application/json");
      expect(res.body.data.id).to.be.eq(userId);
    });
  });

  describe("PUT", () => {
    it("/users/:id", async () => {
      const res = await request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(coti);
      expect(res.body.data).to.deep.include(coti);
    });
  });

  describe("DELETE", () => {
    it("/users/:id", async () => {
      const res = await request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.body.data).to.be.eq(null);
    });
  });
});
