import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage works", () => {

    test("it should mount", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const linkElement = screen.getByTestId("HomePage");
        expect(linkElement).toBeInTheDocument();
    });
});
