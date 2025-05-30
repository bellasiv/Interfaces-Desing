// ChatHeader.jsx
import React from 'react';
import '../components/chatHeader.css';

const ChatHeader = ({ contact }) => {
  return (
    <div className="chat-header">
      <div className="contact-info">
        <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
        <h2>{contact.name}</h2>
      </div>
    </div>
  );
};

export default ChatHeader;