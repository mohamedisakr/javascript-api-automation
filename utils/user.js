import request from "../config/common";
import { coti } from "../fixtures/data";

const token = process.env.TOKEN;

const createRandomUser = async () => {
  const inserted = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(coti);
  return inserted.body.data.id;
};

export { createRandomUser };
