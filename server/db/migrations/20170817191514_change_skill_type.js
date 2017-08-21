exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('skill');
      table.integer('seriousness').defaultTo(50);
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('seriousness');
      table.smallint('skill').defaultTo(0);
    })
  ])
};
