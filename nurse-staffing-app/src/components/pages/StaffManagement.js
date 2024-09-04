import React from 'react';

const staffMembers = [
  { id: 1, name: 'Jhon Wick', designation: 'RN I', status: 'Active', date: '7 June' },
  { id: 2, name: 'Sam Jackson', designation: 'RN II', status: 'Inactive', date: '7 June' },
];

function StaffManagement() {
  return (
    <div>
      <h1>Staff Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.designation}</td>
              <td>{staff.status}</td>
              <td>{staff.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffManagement;
