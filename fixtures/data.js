let guid = Date.now();
import faker from "faker";
const coti = {
  email: faker.internet.email(), // `coti${guid}@mit.edu`,
  name: faker.name.findName(), //`coti${guid}`,
  gender: faker.name.gender(), // "Female",
  status: "Active",
};

const thePost = {
  user_id: 0,
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(),
};

export { coti, thePost };
