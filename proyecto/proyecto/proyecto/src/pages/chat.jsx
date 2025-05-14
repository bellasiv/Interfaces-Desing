import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Menu from "../components/menu.jsx";
import ChatHeader from '../components/chatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ContactList from '../components/ContactList';
import { setCurrentChat, sendMessage } from '../store/chatSlice';
import '../pages/css/chat.css';

const Chat = () => {
  const { contactId } = useParams();
  const dispatch = useDispatch();
  const { conversations, contacts, currentChatId } = useSelector((state) => state.chat);
  
  useEffect(() => {
    if (contactId) {
      dispatch(setCurrentChat(contactId));
    }
  }, [contactId, dispatch]);

  // 🟢 Asegurar que currentChatId siempre tenga un valor válido
  const activeChatId = currentChatId || (contacts.length > 0 ? contacts[0].id : null);
  const currentContact = contacts.find(c => c.id === activeChatId);
  const messages = activeChatId ? conversations[activeChatId] || [] : [];

  const handleSend = (text, attachments = []) => {
    if (text.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now(),
        text,
        sender: 'me',
        timestamp: new Date().toISOString(),
        attachments,
      };
      dispatch(sendMessage({ chatId: activeChatId, message: newMessage }));
    }
  };

  return (
    <div className="chat-page">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="chat-container">
        <div className="sidebar">
          <div className="search-container2">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <ContactList contacts={contacts} activeContactId={activeChatId} />
        </div>
        <div className="chat-main">
          {currentContact ? (
            <>
              <ChatHeader contact={currentContact} />
              <MessageList messages={messages} />
              <MessageInput sendMessage={handleSend} />
            </>
          ) : (
            <div className="no-chat-selected">Selecciona un chat para empezar</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
