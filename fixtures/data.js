let guid = Date.now();

const coti = {
  email: `coti${guid}@mit.edu`,
  name: `coti${guid}`,
  gender: "Female",
  status: "Active",
};

const thePost = {
  user_id: 0,
  title: "TDD",
  body: "Why TDD is important",
};

export { coti, thePost };
