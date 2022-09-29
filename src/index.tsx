import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import "./index.scss";
import Router from "./app/router";
import store from "./app/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
