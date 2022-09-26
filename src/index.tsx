import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import './index.scss';

import LunchRouter from "./app/routes/LunchRouter";
import MissingPageRouter from "./app/routes/MissingPageRouter";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="lunch" element={<LunchRouter />} />
        <Route path="*" element={<MissingPageRouter />}
    />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
