import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState('');
  const [shift, setShift] = useState('');
  const [status, setStatus] = useState('Active');
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId')); // Replace with actual student ID retrieval
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJobs(response.data);
      } catch (err) {
        setError('Error fetching jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = async () => {
    if (!jobDetails.trim() || !shift.trim()) {
      setError('Job details and shift are required');
      return;
    }

    try {
      const response = await axios.post('/api/jobs', {
        jobDetails,
        shift,
        status,
        studentId
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setJobs([...jobs, response.data]);
      setJobDetails('');
      setShift('');
      setStatus('Active');
      setError(null);
    } catch (err) {
      setError('Error creating job');
    }
  };

  const handleUpdateJob = async (jobId) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}`, {
        jobDetails,
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setJobs(jobs.map(job => job._id === jobId ? response.data : job));
      setJobDetails('');
      setStatus('Active');
      setSelectedJobId(null);
      setError(null);
    } catch (err) {
      setError('Error updating job');
    }
  };

  return (
    <div className="jobs-container">
      <h1>Job Management</h1>
      {error && <p className="error">{error}</p>}
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-item">
            <p><strong>Job Details:</strong> {job.jobDetails}</p>
            <p><strong>Shift:</strong> {job.shift}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Student ID:</strong> {job.studentId}</p>
            <span>{new Date(job.createdAt).toLocaleString()}</span>
            <button onClick={() => {
              setSelectedJobId(job._id);
              setJobDetails(job.jobDetails);
              setStatus(job.status);
            }}>Edit</button>
          </div>
        ))}
      </div>
      <div className="job-form">
        <textarea
          value={jobDetails}
          onChange={(e) => setJobDetails(e.target.value)}
          placeholder="Job details..."
        />
        <input
          type="text"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          placeholder="Shift..."
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Draft">Draft</option>
        </select>
        {selectedJobId ? (
          <button onClick={() => handleUpdateJob(selectedJobId)}>Update Job</button>
        ) : (
          <button onClick={handleCreateJob}>Create Job</button>
        )}
      </div>
    </div>
  );
};

export default Jobs;
