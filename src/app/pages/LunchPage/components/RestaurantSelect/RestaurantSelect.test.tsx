import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import RestaurantSelect from "./RestaurantSelect";
import store from "src/app/store";
import { Provider } from "react-redux";

describe("RestaurantSelect works", () => {
    test("it should mount", () => {
        render(
            <Provider store={store}>
                <RestaurantSelect />
            </Provider>
        );
        const linkElement = screen.getByTestId("RestaurantSelect");
        expect(linkElement).toBeInTheDocument();
    });

    test("it should render correnctly", () => {
        const component = renderer.create(
            <Provider store={store}>
                <RestaurantSelect />
            </Provider>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
