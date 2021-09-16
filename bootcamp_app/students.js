const { Pool } = require('pg');
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT id, name, cohorts.name AS cohort
FROM students
JOIN cohorts
ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(queryString, values)
.then(res => {
  // console.log(res);
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`)
  })
})
.catch(err => console.error('query error', err.stack));

// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};