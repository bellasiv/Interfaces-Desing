import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from "../components/menu.jsx";
import ChatHeader from '../components/chatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ContactList from '../components/ContactList';
import UserSearch from '../components/UserSearch';
import logo from '../assets/logo.png';
import { setCurrentChat, sendMessage, setMessages, addContact, setContacts } from '../store/ChatSlice';
import '../pages/css/chat.css';
import { doc, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase-config';


// ✅ Función para crear un ID único para cada par de usuarios
const generateChatId = (id1, id2) => {
  return [id1, id2].sort().join('_');
};

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();

  const { conversations, contacts, currentChatId } = useSelector((state) => state.chat);
  const [loggedUser] = useState(() => {
    const user = localStorage.getItem("usuarioLogueado");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    if (contactId) {
      dispatch(setCurrentChat(contactId));
    }
  }, [contactId, dispatch]);

  const activeChatId = currentChatId || (contacts.length > 0 ? contacts[0].id : null);
  const currentContact = contacts.find(c => c.id === activeChatId);
  const messages = activeChatId ? conversations[activeChatId] || [] : [];

  // ✅ Escuchar mensajes de la colección compartida
  useEffect(() => {
    if (!loggedUser || !activeChatId) return;

    const chatId = generateChatId(loggedUser.id, activeChatId);
    const mensajesRef = collection(db, "chats", chatId, "mensajes");
    const q = query(mensajesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch(setMessages({ chatId: activeChatId, messages: loadedMessages }));
    });

    return () => unsubscribe();
  }, [loggedUser, activeChatId, dispatch]);

  useEffect(() => {
    if (!loggedUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "usuarios", loggedUser.id, "contactos"),
      (snapshot) => {
        const fetchedContacts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setContacts(fetchedContacts));
      }
    );

    return () => unsubscribe();
  }, [loggedUser]);

  // ✅ Enviar mensaje a colección única
  const handleSend = async (text, attachments = []) => {
    if (!loggedUser || !activeChatId) return;

    if (text.trim() || attachments.length > 0) {
      const newMessage = {
        text,
        sender: loggedUser.id,
        timestamp: serverTimestamp(),
        attachments,
      };

      try {
        const chatId = generateChatId(loggedUser.id, activeChatId);
        const mensajesRef = collection(db, "chats", chatId, "mensajes");
        await addDoc(mensajesRef, newMessage);

        // Actualizar contactos
        const contactData = contacts.find(c => c.id === activeChatId) || await getContactData(activeChatId);

        // Guardar contacto en usuario actual
        if (contactData) {
          await setDoc(doc(db, "usuarios", loggedUser.id, "contactos", activeChatId), {
            ...contactData,
            lastMessage: text,
            timestamp: serverTimestamp(),
          });
        }

        // Guardar usuario actual como contacto del receptor
        await setDoc(doc(db, "usuarios", activeChatId, "contactos", loggedUser.id), {
          uid: loggedUser.id,
          name: loggedUser.name || "Tú",
          avatar: loggedUser.avatar || "",
          lastMessage: text,
          timestamp: serverTimestamp(),
        });

      } catch (err) {
        console.error("Error enviando mensaje:", err);
      }
    }
  };

  // 🔄 Obtener info de contacto si no está en el listado
  const getContactData = async (uid) => {
    const docRef = doc(db, "usuarios", uid);
    const contactDoc = await getDoc(docRef);
    if (contactDoc.exists()) {
      const data = contactDoc.data();
      return {
        name: data.name || "Desconocido",
        avatar: data.avatar || "",
      };
    }
    return null;
  };

  const handleUserSelect = async (user) => {
    const exists = contacts.find(c => c.id === user.id);

    if (!exists) {
      const contactData = {
        name: user.name,
        avatar: user.avatar || '',
        lastMessage: '',
        timestamp: serverTimestamp()
      };

      await setDoc(doc(db, "usuarios", loggedUser.id, "contactos", user.id), contactData);
      await setDoc(doc(db, "usuarios", user.id, "contactos", loggedUser.id), {
        name: loggedUser.name,
        avatar: loggedUser.avatar || '',
        lastMessage: '',
        timestamp: serverTimestamp()
      });

      dispatch(addContact({
        id: user.id,
        ...contactData,
        status: 'offline',
      }));
    }

    dispatch(setCurrentChat(user.id));
    navigate(`/chat/${user.id}`);
  };

  return (
    <div className="chat-page">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="chat-container">
        <div className="sidebar">
          <div className="search-container2">
            <UserSearch onUserSelect={handleUserSelect} />
          </div>
          <ContactList contacts={contacts} activeContactId={activeChatId} />
        </div>
        <div className="chat-main">
          {currentContact ? (
            <>
              <ChatHeader contact={currentContact} />
              <MessageList messages={messages} currentUserId={loggedUser.id} />
              <MessageInput sendMessage={handleSend} />
            </>
          ) : (
            <div className="no-chat-selected">
              <img src={logo} alt="Selecciona un chat para empezar" className="no-chat-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
