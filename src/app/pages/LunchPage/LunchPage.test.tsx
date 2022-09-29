import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import LunchPage from "./LunchPage";
import store from "src/app/store";
import { Provider } from "react-redux";

describe("LunchPage works", () => {
    test("it should mount", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LunchPage />
                </Provider>
            </BrowserRouter>
        );
        const lunchPage = screen.getByTestId("LunchPage");
        expect(lunchPage).toBeInTheDocument();
    });
});
