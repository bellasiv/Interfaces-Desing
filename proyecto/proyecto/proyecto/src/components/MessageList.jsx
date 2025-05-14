import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Ensures scroll when messages change

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`message ${message.sender === 'me' ? 'message-sent' : 'message-received'}`}
        >
          <div className="message-content">
            {message.text}
            {message.attachments?.map((attachment, index) => (
              <div key={index} className="message-attachment">
                {attachment.type === 'image' && (
                  <img src={attachment.url} alt="Attachment" className="attachment-image" />
                )}
              </div>
            ))}
          </div>
          <div className="message-timestamp">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
