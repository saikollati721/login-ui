import logo from './logo.svg';
import './App.css';

import CustomRoutes from "./routes/custom-routes";

import React from "react";
import { ToastContainer } from "react-toastify";
import SessionContextProvider from './providers/session-context-provider';

function App() {
  return (
    <div>
      <div>
        <SessionContextProvider>
          <CustomRoutes />
          <ToastContainer />
        </SessionContextProvider>
        
        
      </div>
    </div>
  );
}

export default App;
