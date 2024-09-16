import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [shift, setShift] = useState('Morning');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all staffing requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/staffing', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRequests(response.data);
      } catch (err) {
        setError('Error fetching staffing requests');
      }
    };

    fetchRequests();
  }, []);

  const handleCreateRequest = async () => {
    if (!staffId || !studentId || !shift || !status) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/staffing', {
        staffId,
        studentId,
        shift,
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setRequests([...requests, response.data]);
      setStaffId('');
      setStudentId('');
      setShift('Morning');
      setStatus('Pending');
      setError(null);
    } catch (err) {
      setError('Error creating staffing request');
    }
  };

  return (
    <div className="staffing-request-container">
      <h1>Staffing Requests Management</h1>
      {error && <p className="error">{error}</p>}
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <p><strong>Staff ID:</strong> {request.staffId}</p>
            <p><strong>Student ID:</strong> {request.studentId}</p>
            <p><strong>Shift:</strong> {request.shift}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="request-form">
        <input
          type="text"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          placeholder="Staff ID"
        />
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Student ID"
        />
        <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleCreateRequest}>Create Staffing Request</button>
      </div>
    </div>
  );
};

export default StaffingRequest;
