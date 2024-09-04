import React from 'react';

const students = [
  { id: 1, name: 'Emily Wilson', status: 'Active', shift: 'Morning Route', date: '11 June' },
  { id: 2, name: 'Sam Jackson', status: 'Completed', shift: 'Evening Route', date: '12 June' },
];

function StudentManagement() {
  return (
    <div>
      <h1>Student Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Shift</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.status}</td>
              <td>{student.shift}</td>
              <td>{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManagement;
