// MessageInput.jsx
import React, { useState, useRef } from 'react';
import './MessageInput.css';

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Emoji list could be expanded
  const emojis = ['😀', '😂', '😍', '🐶', '🐱', '🐾', '❤️', '👍', '👋', '🎉', '🎈', '🎁'];

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(text, attachments);
    setText('');
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const addEmoji = (emoji) => {
    setText(text + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="message-input-container">
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((attachment, index) => (
            <div key={index} className="attachment-preview">
              {attachment.type === 'image' && (
                <img src={attachment.url} alt="Attachment" className="attachment-preview-image" />
              )}
              <button 
                className="remove-attachment-button"
                onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="message-form">
        <button 
          type="button" 
          className="attachment-button"
          onClick={handleButtonClick}
        >
          <i className="fa fa-paperclip"></i>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
          accept="image/*"
        />
        
        <button 
          type="button" 
          className="emoji-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <i className="fa fa-smile-o"></i>
        </button>
        
        {showEmojiPicker && (
          <div className="emoji-picker">
            {emojis.map((emoji, index) => (
              <button 
                key={index} 
                className="emoji" 
                onClick={() => addEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        
        <button type="submit" className="send-button">
          <i className="fa fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;