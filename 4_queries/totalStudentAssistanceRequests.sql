SELECT COUNT(assistance_requests.student_id) AS total_assistances, students.name AS name
FROM students
JOIN assistance_requests
ON students.id = assistance_requests.student_id
WHERE students.name = 'Elliot Dickinson'
GROUP BY students.name;