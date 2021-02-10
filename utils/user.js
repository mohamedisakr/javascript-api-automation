import suprttest from "supertest";
// import "@babel/polyfill";
const request = suprttest("https://gorest.co.in/public-api/");
const token =
  "f23c96ab955134d34fb15a05c891320a81c0a6a309c9f481604e380d19bef872";
import { coti } from "../fixtures/data";

const createRandomUser = async () => {
  const inserted = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(coti);
  return inserted.body.data.id;
};

export { createRandomUser };
