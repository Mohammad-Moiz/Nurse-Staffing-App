import React from 'react';

const jobs = [
  { id: 1, title: 'Morning Route 5', status: 'Active', date: '7 June' },
  { id: 2, title: 'Afternoon Route 4', status: 'Draft', date: '7 June' },
  // More job data...
];

function JobManagement() {
  return (
    <div>
      <h1>Job Management</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.status}</td>
              <td>{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobManagement;
