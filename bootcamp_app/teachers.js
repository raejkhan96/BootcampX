const { Pool } = require('pg');
const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}%`];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests
ON assistance_requests.teacher_id = teachers.id
JOIN students
ON students.id = assistance_requests.student_id
JOIN cohorts
ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`;

pool.query(queryString, values)
.then(res => {
  // console.log(res);
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`)
  })
})
.catch(err => console.error('query error', err.stack));