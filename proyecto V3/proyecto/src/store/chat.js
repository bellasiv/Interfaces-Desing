import React from 'react';
import ContactListContainer from './ContactListContainer';
import ContactList from './ContactList';

const Chats = ({ contacts, activeChatId }) => {
  return (
    <>
      <ContactListContainer />
      <ContactList contacts={contacts} activeContactId={activeChatId} />
    </>
  );
};

export default Chats;