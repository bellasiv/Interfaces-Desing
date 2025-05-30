import { StrictMode } from "react";  
import { createRoot } from "react-dom/client";  
import { BrowserRouter } from "react-router-dom";  
import { Provider } from 'react-redux';
import { store } from './store/store';
import "./index.css";  
import App from "./App.jsx";  

// Renderiza la aplicación con Redux
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>  {/* Envolvemos la app con Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
