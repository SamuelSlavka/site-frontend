import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import "./index.scss";
import Router from "./app/router";
import store from "./app/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

let persistor = persistStore(store);
  
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    // </React.StrictMode>
);

reportWebVitals();
