exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.boolean('connected').defaultTo(false);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('connected');
    })
  ])
};


