import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    conversations: {},
    contacts: [],
    currentChatId: null,
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
      if (!state.conversations[action.payload]) {
        state.conversations[action.payload] = [];
      }
    },
    sendMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.conversations[chatId]) {
        state.conversations[chatId] = [];
      }
      state.conversations[chatId].push(message);
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.conversations[chatId] = messages;
    },
    addContact: (state, action) => {
      const exists = state.contacts.find(c => c.id === action.payload.id);
      if (!exists) {
        state.contacts.push(action.payload);
      }
    },
  },
});

export const { setCurrentChat, sendMessage, setMessages, addContact, setContacts } = chatSlice.actions;
export default chatSlice.reducer;