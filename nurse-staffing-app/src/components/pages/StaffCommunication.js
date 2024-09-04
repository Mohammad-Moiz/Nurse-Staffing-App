import React, { useState } from 'react';

function StaffCommunication() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Jhon Wick', message: 'Message from Jhon', date: '12 Jun' },
    { id: 2, sender: 'Eva', message: 'Message from Eva', date: '12 Jun' },
    // More messages...
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { id: messages.length + 1, sender: 'Admin', message: newMessage, date: new Date().toLocaleDateString() }]);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Staff Communication</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.sender}: {msg.message} - {msg.date}</li>
        ))}
      </ul>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default StaffCommunication;
