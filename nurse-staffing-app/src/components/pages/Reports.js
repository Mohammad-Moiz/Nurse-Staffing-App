import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all reports from the backend
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setReports(response.data);
      } catch (err) {
        setError('Error fetching reports');
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const response = await axios.post('/api/reports', {
        userId: localStorage.getItem('userId'), // Replace with actual user ID retrieval
        reportData: { title, content }
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setReports([...reports, response.data]);
      setTitle('');
      setContent('');
      setError(null);
    } catch (err) {
      setError('Error generating report');
    }
  };

  return (
    <div className="reports-container">
      <h1>Reports Management</h1>
      {error && <p className="error">{error}</p>}
      <div className="reports-list">
        {reports.map((report) => (
          <div key={report._id} className="report-item">
            <h3>{report.reportData.title}</h3>
            <p>{report.reportData.content}</p>
            <p><strong>User:</strong> {report.user.name}</p>
            <span>{new Date(report.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="report-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Report Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Report Content"
        />
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>
    </div>
  );
};

export default Reports;
