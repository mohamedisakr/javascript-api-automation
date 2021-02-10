import suprttest from "supertest";
import { expect } from "chai";
import "@babel/polyfill";
const request = suprttest("https://gorest.co.in/public-api/");
import { createRandomUser } from "../utils/user";
// import { thePost as postData } from "../fixtures/data";
const token =
  "f23c96ab955134d34fb15a05c891320a81c0a6a309c9f481604e380d19bef872";

describe("Users' Posts", () => {
  let postId = 0;
  let userId = 0;

  before(async () => {
    userId = await createRandomUser();
  });

  describe("POST", () => {
    it("add new post", async () => {
      const thePost = {
        user_id: userId,
        title: "TDD",
        body: "Why TDD is important",
      };
      // const thePost = { user_id: userId, ...postData };

      const res = await request
        .post("posts")
        .set("Authorization", `Bearer ${token}`)
        .send(thePost);
      postId = res.body.data.id;
      expect(res.body.data).to.deep.include(thePost);
    });

    it("get added post", async () => {
      await request
        .get(`posts/${postId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });
});
