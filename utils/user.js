import request from "../config/common";
import { token } from "../config/app-config";
import { coti } from "../fixtures/data";

const createRandomUser = async () => {
  const inserted = await request
    .post("users")
    .set("Authorization", `Bearer ${token}`)
    .send(coti);
  return inserted.body.data.id;
};

export { createRandomUser };
