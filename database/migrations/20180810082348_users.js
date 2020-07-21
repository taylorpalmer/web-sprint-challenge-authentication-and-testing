exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments();

    users.string("username", 255).notNull().unique();
    users.string("password", 255).notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
