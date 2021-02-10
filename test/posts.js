import { expect } from "chai";
import faker from "faker";
import "@babel/polyfill";
import request from "../config/common";
import { token } from "../config/app-config";
import { createRandomUser } from "../utils/user";
// import { thePost } from "../fixtures/data";

describe.only("Users' Posts", () => {
  let postId = 0;
  let userId = 0;

  before(async () => {
    userId = await createRandomUser();
  });

  describe("POST", () => {
    it("add new post", async () => {
      const thePost = {
        user_id: userId,
        title: faker.lorem.sentence(), //"TDD",
        body: faker.lorem.paragraphs(), //"Why TDD is important",
      };
      // const thePost = { user_id: userId, ...postData };

      const res = await request
        .post("posts")
        .set("Authorization", `Bearer ${token}`)
        .send(thePost);
      postId = res.body.data.id;
      // expect(res.body.data).to.deep.include(thePost);
      expect(res.body.data.id).to.be.eq(postId);
    });

    it("get added post", async () => {
      await request
        .get(`posts/${postId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Negative tests", () => {
    it("401 authentication", async () => {
      const thePost = {
        user_id: userId,
        title: faker.lorem.sentence(), //"TDD",
        body: faker.lorem.paragraphs(), //"Why TDD is important",
      };

      const res = await request
        .post("posts")
        // .set("Authorization", `Bearer ${token}`)
        .send(thePost);
      postId = res.body.data.id;
      expect(res.body.code).to.be.eq(401);
    });

    it("422 validation", async () => {
      const thePost = {
        user_id: userId,
        title: faker.lorem.sentence(), //"TDD",
        // body: faker.lorem.paragraphs(), //"Why TDD is important",
        // body: "Why TDD is important",
      };

      const res = await request
        .post("posts")
        .set("Authorization", `Bearer ${token}`)
        .send(thePost);
      postId = res.body.data.id;
      expect(res.body.code).to.be.eq(422);
    });
  });
});
