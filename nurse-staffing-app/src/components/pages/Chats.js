import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Replace with actual user ID retrieval

  useEffect(() => {
    // Fetch all chats from the backend
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chats', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setChats(response.data);
      } catch (err) {
        setError('Error fetching chats');
      }
    };

    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const response = await axios.post('/api/chats', {
        userId,
        message: newMessage
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setChats([...chats, response.data]);
      setNewMessage('');
      setError(null);
    } catch (err) {
      setError('Error sending message');
    }
  };

  return (
    <div className="chats-container">
      <h1>Chats</h1>
      {error && <p className="error">{error}</p>}
      <div className="chats-list">
        {chats.map((chat) => (
          <div key={chat._id} className="chat-message">
            <p><strong>{chat.user.name}</strong>: {chat.message}</p>
            <span>{new Date(chat.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chats;
