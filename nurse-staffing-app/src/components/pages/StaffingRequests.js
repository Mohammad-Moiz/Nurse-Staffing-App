import React from 'react';

const staffingRequests = [
  { id: 1, name: 'Jhon Wick', status: 'Pending', shift: 'Morning Route', date: '7 June' },
  { id: 2, name: 'Sam Jackson', status: 'Approved', shift: 'Afternoon Route', date: '7 June' },
];

function StaffingRequests() {
  return (
    <div>
      <h1>Staffing Requests</h1>
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
          {staffingRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.status}</td>
              <td>{request.shift}</td>
              <td>{request.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffingRequests;
