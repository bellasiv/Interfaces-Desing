import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';
import { setContacts } from '../store/ChatSlice';
import '../components/contactList.css';
import { useNavigate } from 'react-router-dom';

const ContactList = ({ activeContactId }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const contacts = useSelector((state) => state.chat.contacts);

  useEffect(() => {
    if (!loggedUser) return;

    const contactosRef = collection(db, "usuarios", loggedUser.id, "contactos");

    const unsubscribe = onSnapshot(contactosRef, (snapshot) => {
      const contactsData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((contact) => contact.id !== loggedUser.id); // 👈 evita el contacto propio


      dispatch(setContacts(contactsData));
    });

    return () => unsubscribe();
  }, [loggedUser, dispatch]);

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item ${contact.id === activeContactId ? 'active' : ''}`}
          onClick={() => navigate(`/chat/${contact.id}`)}
        >
          <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
          <div className="contact-info">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-last-message">{contact.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;