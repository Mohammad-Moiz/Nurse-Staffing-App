import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import './dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Alerts</h3>
            <p>Number of alerts: 5</p>
          </div>
          <div className="stat-card">
            <h3>Chats</h3>
            <p>Active chats: 12</p>
          </div>
          <div className="stat-card">
            <h3>Users</h3>
            <p>Total users: 300</p>
          </div>
          <div className="stat-card">
            <h3>Staffing Requests</h3>
            <p>Pending requests: 7</p>
          </div>
          <div className="stat-card">
            <h3>Student Management</h3>
            <p>Active students: 150</p>
          </div>
          <div className="stat-card">
            <h3>Job Management</h3>
            <p>Open jobs: 25</p>
          </div>
        </div>
        <Outlet /> {/* This will render the content of the selected module */}
      </div>
    </div>
  );
};

export default Dashboard;
