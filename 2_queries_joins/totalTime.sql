SELECT sum(duration) AS total_duration
FROM assignment_submissions
INNER JOIN students
ON students.id = assignment_submissions.student_id
WHERE students.name = 'Ibrahim Schimmel';