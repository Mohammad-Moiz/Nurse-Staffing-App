import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [staffId, setStaffId] = useState(localStorage.getItem('staffId')); // Replace with actual staff ID retrieval
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all issues from the backend
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/issues', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setIssues(response.data);
      } catch (err) {
        setError('Error fetching issues');
      }
    };

    fetchIssues();
  }, []);

  const handleCreateIssue = async () => {
    if (!description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    try {
      const response = await axios.post('/api/issues', {
        description,
        status,
        staffId
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setIssues([...issues, response.data]);
      setDescription('');
      setStatus('Open');
      setError(null);
    } catch (err) {
      setError('Error creating issue');
    }
  };

  return (
    <div className="issues-container">
      <h1>Issues</h1>
      {error && <p className="error">{error}</p>}
      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue._id} className="issue-item">
            <p><strong>Description:</strong> {issue.description}</p>
            <p><strong>Status:</strong> {issue.status}</p>
            <p><strong>Reported by:</strong> {issue.staffId}</p>
            <span>{new Date(issue.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="issue-form">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Issue description..."
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>
        <button onClick={handleCreateIssue}>Create Issue</button>
      </div>
    </div>
  );
};

export default Issues;
