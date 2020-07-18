exports.seed = async function (knex) {
  await knex("users").insert([
    {
      username: "dalecooper",
      password: "password",
    },
    {
      username: "deputyhawk",
      password: "password",
    },
    {
      username: "lucymoran",
      password: "password",
    },
  ]);
};
