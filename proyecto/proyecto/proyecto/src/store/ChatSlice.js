import { createSlice } from '@reduxjs/toolkit';
import leader1 from "../assets/leader1.jpg";
import leader2 from "../assets/leader2.jpg";
import leader3 from "../assets/leader3.jpg";
import leader4 from "../assets/leader4.jpg";
import leader5 from "../assets/leader5.jpg";
import leader6 from "../assets/leader6.jpg";

const initialState = {
  conversations: {
    user2: [
      { id: 1, text: "Hey, what's the plan for tonight?", sender: 'me', timestamp: new Date().toISOString() },
      { id: 2, text: "Movie night at my place?", sender: 'other', timestamp: new Date().toISOString() },
      { id: 3, text: "Nah, let's go out!", sender: 'me', timestamp: new Date().toISOString() },
    ],
    user3: [],
    user4: [],
    user5: [],
    user6: [],
  },
  currentChatId: null, // No default chat
  contacts: [
    { id: 'user2', name: 'Jordan', avatar: leader1, lastMessage: "Hey, I know its been a...", status: 'online' },
    { id: 'user3', name: 'Alexx', avatar: leader2, lastMessage: "LOL", status: 'offline' },
    { id: 'user4', name: 'Sam', avatar: leader6, lastMessage: "HAHHAHAHA", status: 'online' },
    { id: 'user5', name: 'Lola', avatar: leader3, lastMessage: "Idk wbu?", status: 'online' },
    { id: 'user6', name: 'Toby', avatar: leader4, lastMessage: "Yes please, that would be..", status: 'offline' },
    { id: 'user7', name: 'Coco', avatar: leader5, lastMessage: "omgg", status: 'online' },
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
      if (!state.conversations[action.payload]) {
        state.conversations[action.payload] = []; // Ensure chat exists
      }
    },
    sendMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.conversations[chatId]) {
        state.conversations[chatId] = []; // Ensure chat exists before pushing messages
      }
      state.conversations[chatId].push(message);
    },
  },
});

export const { setCurrentChat, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
