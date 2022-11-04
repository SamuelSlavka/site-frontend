import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
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
    
    test("it should render correnctly", () => {
        const component = renderer.create(
            <BrowserRouter>
                <Provider store={store}>
                    <LunchPage />
                </Provider>
            </BrowserRouter>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
