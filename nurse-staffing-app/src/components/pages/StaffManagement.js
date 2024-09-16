import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('Active');
  const [registrationId, setRegistrationId] = useState('');
  const [editId, setEditId] = useState(null); // For updating staff
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all staff members from the backend
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get('/api/staff', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStaffMembers(response.data);
      } catch (err) {
        setError('Error fetching staff members');
      }
    };

    fetchStaffMembers();
  }, []);

  const handleCreateOrUpdateStaff = async () => {
    if (!name || !designation || !registrationId) {
      setError('All fields are required');
      return;
    }

    try {
      const requestData = {
        name,
        designation,
        status,
        registrationId
      };

      let response;
      if (editId) {
        // Update staff
        response = await axios.put(`/api/staff/${editId}`, requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Update the staff list after edit
        setStaffMembers(staffMembers.map(staff => staff._id === editId ? response.data : staff));
      } else {
        // Create new staff
        response = await axios.post('/api/staff', requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStaffMembers([...staffMembers, response.data]);
      }

      // Clear form fields
      setName('');
      setDesignation('');
      setStatus('Active');
      setRegistrationId('');
      setEditId(null);
      setError(null);
    } catch (err) {
      setError('Error creating/updating staff member');
    }
  };

  const handleEdit = (staff) => {
    setName(staff.name);
    setDesignation(staff.designation);
    setStatus(staff.status);
    setRegistrationId(staff.registrationId);
    setEditId(staff._id);
  };

  return (
    <div className="staff-management-container">
      <h1>Staff Management</h1>
      {error && <p className="error">{error}</p>}

      <div className="staff-list">
        {staffMembers.map((staff) => (
          <div key={staff._id} className="staff-item">
            <p><strong>Name:</strong> {staff.name}</p>
            <p><strong>Designation:</strong> {staff.designation}</p>
            <p><strong>Status:</strong> {staff.status}</p>
            <p><strong>Registration ID:</strong> {staff.registrationId}</p>
            <button onClick={() => handleEdit(staff)}>Edit</button>
          </div>
        ))}
      </div>

      <div className="staff-form">
        <h2>{editId ? 'Edit Staff Member' : 'Create New Staff Member'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Designation"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="text"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
          placeholder="Registration ID"
        />
        <button onClick={handleCreateOrUpdateStaff}>
          {editId ? 'Update Staff' : 'Create Staff'}
        </button>
      </div>
    </div>
  );
};

export default StaffManagement;
