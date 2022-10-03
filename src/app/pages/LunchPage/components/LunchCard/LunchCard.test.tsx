import { render, screen } from "@testing-library/react";
import LunchCard from "./LunchCard";
import store from "src/app/store";
import { Provider } from "react-redux";

test("LunchCard works", () => {
    render(
        <Provider store={store}>
            <LunchCard lunch={{id:"0", restaurant_id:"1", value: []}}/>
        </Provider>
    );

    const linkElement = screen.getByTestId("LunchCard");
    expect(linkElement).toBeInTheDocument();
});
