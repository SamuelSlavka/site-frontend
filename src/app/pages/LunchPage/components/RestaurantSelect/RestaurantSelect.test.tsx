import { render, screen } from "@testing-library/react";
import RestaurantSelect from "./RestaurantSelect";
import store from "src/app/store";
import { Provider } from "react-redux";

test("RestaurantSelect works", () => {
    render(
        <Provider store={store}>
            <RestaurantSelect />
        </Provider>
    );

    const linkElement = screen.getByTestId("RestaurantSelect");
    expect(linkElement).toBeInTheDocument();
});
