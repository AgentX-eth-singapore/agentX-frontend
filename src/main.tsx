import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import Web3ModalProvider from '@/context';
import { cookieToInitialState } from "wagmi";
import { config } from "./config/wallet.tsx";


const initialState = cookieToInitialState(config, document.cookie)


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Web3ModalProvider initialState={initialState}>{<App />}</Web3ModalProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
