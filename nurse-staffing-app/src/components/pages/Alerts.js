import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch alerts from the backend
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('/api/alerts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAlerts(response.data);
      } catch (err) {
        setError('Error fetching alerts');
      }
    };

    fetchAlerts();
  }, []);

  const handleCreateAlert = async () => {
    if (!newAlert.trim()) {
      setError('Alert message cannot be empty');
      return;
    }
    try {
      const response = await axios.post('/api/alerts', {
        message: newAlert,
        staffId: 'your-staff-id', 
        status: 'Unread'
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAlerts([...alerts, response.data]);
      setNewAlert('');
      setError(null);
    } catch (err) {
      setError('Error creating alert');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`/api/alerts/${id}`, {
        status: 'Read'
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAlerts(alerts.map(alert => 
        alert._id === id ? { ...alert, status: 'Read' } : alert
      ));
    } catch (err) {
      setError('Error marking alert as read');
    }
  };

  return (
    <div className="alerts-container">
      <h1>Alerts</h1>
      {error && <p className="error">{error}</p>}
      <div className="alert-form">
        <input
          type="text"
          value={newAlert}
          onChange={(e) => setNewAlert(e.target.value)}
          placeholder="New alert message"
        />
        <button onClick={handleCreateAlert}>Create Alert</button>
      </div>
      <ul className="alerts-list">
        {alerts.map((alert) => (
          <li key={alert._id} className={alert.status === 'Read' ? 'alert-read' : 'alert-unread'}>
            <p>{alert.message}</p>
            <span>{new Date(alert.createdAt).toLocaleString()}</span>
            {alert.status === 'Unread' && (
              <button onClick={() => handleMarkAsRead(alert._id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
