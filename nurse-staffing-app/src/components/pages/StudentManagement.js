import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [studentId, setStudentId] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [editId, setEditId] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all students from the backend
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudents(response.data);
      } catch (err) {
        setError('Error fetching students');
      }
    };

    fetchStudents();
  }, []);

  const handleCreateOrUpdateStudent = async () => {
    if (!name || !address || !studentId || !registrationDate) {
      setError('All fields are required');
      return;
    }

    try {
      const requestData = {
        name,
        address,
        studentId,
        registrationDate,
      };

      let response;
      if (editId) {
        // Update student
        response = await axios.put(`/api/students/${editId}`, requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Update the student list after edit
        setStudents(students.map(student => student._id === editId ? response.data : student));
      } else {
        // Create new student
        response = await axios.post('/api/students', requestData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudents([...students, response.data]);
      }

      // Clear form fields
      setName('');
      setAddress('');
      setStudentId('');
      setRegistrationDate('');
      setEditId(null);
      setError(null);
    } catch (err) {
      setError('Error creating/updating student profile');
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAddress(student.address);
    setStudentId(student.studentId);
    setRegistrationDate(student.registrationDate.slice(0, 10)); // Format date to YYYY-MM-DD
    setEditId(student._id);
  };

  return (
    <div className="student-management-container">
      <h1>Student Management</h1>
      {error && <p className="error">{error}</p>}

      <div className="student-list">
        {students.map((student) => (
          <div key={student._id} className="student-item">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Registration Date:</strong> {new Date(student.registrationDate).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(student)}>Edit</button>
          </div>
        ))}
      </div>

      <div className="student-form">
        <h2>{editId ? 'Edit Student Profile' : 'Create New Student Profile'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Student ID"
        />
        <input
          type="date"
          value={registrationDate}
          onChange={(e) => setRegistrationDate(e.target.value)}
          placeholder="Registration Date"
        />
        <button onClick={handleCreateOrUpdateStudent}>
          {editId ? 'Update Student' : 'Create Student'}
        </button>
      </div>
    </div>
  );
};

export default StudentManagement;
