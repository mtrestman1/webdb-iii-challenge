
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'max'},
        {cohort_id: 2, name: 'max1'},
        {cohort_id: 3, name: 'max2'}
      ]);
    });
};
