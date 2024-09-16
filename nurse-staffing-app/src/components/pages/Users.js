import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editId, setEditId] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async () => {
    if (!name || !email || !role) {
      setError('All fields are required');
      return;
    }

    try {
      const requestData = {
        name,
        email,
        role,
      };

      let response;
      if (editId) {
        // Update existing user
        response = await axios.put(`/api/users/${editId}`, requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Update user list after edit
        setUsers(users.map(user => (user._id === editId ? response.data : user)));
      }

      // Clear form fields
      setName('');
      setEmail('');
      setRole('');
      setEditId(null);
      setError(null);
    } catch (err) {
      setError('Error creating/updating user');
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditId(user._id);
  };

  return (
    <div className="users-management-container">
      <h1>Users Management</h1>
      {error && <p className="error">{error}</p>}

      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
          </div>
        ))}
      </div>

      <div className="user-form">
        <h2>{editId ? 'Edit User' : 'User Information'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="student">Student</option>
        </select>
        <button onClick={handleCreateOrUpdateUser}>
          {editId ? 'Update User' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Users;
