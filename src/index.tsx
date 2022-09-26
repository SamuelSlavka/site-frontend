import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

import App from "./app/App";
import LunchRouter from "./app/routes/LunchRouter";
import MissingPageRouter from "./app/routes/MissingPageRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="lunch" element={<LunchRouter />} />
        </Route>
        <Route path="*" element={<MissingPageRouter />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
