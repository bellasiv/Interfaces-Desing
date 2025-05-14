import React from 'react';
import { Link } from 'react-router-dom';
import './ContactList.css';

const ContactList = ({ contacts, activeContactId }) => {
  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <Link 
          to={`/chat/${contact.id}`} 
          key={contact.id}
          className={`contact-item ${contact.id === activeContactId ? 'active' : ''}`}
        >
          <div className="contact-avatar-container">
            <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
            <span className={`status-indicator ${contact.status}`}></span>
          </div>
          <div className="contact-details">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-last-message">{contact.lastMessage}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ContactList;
