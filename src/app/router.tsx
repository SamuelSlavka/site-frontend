import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LunchPage from "./pages/LunchPage/LunchPage";
import MissingPage from "./pages/MissingPage/MissingPage";

const Router = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="lunch" element={<LunchPage />} />
        <Route path="*" element={<MissingPage />} />
    </Routes>
);

export default Router;