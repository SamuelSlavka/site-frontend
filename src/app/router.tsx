import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LunchPage from "./pages/LunchPage/LunchPage";
import MissingPage from "./pages/MissingPage/MissingPage";

const Router = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="lunch" element={<LunchPage />} />
            <Route path="*" element={<MissingPage />} />
        </Routes>
    </BrowserRouter>
)};

export default Router;
