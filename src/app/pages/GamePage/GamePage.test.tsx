import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GamePage from "./GamePage";
import React from "react";

describe("<GamePage />", () => {
    test("it should mount", () => {
        render(<GamePage />);

        const gamePage = screen.getByTestId("GamePage");
        expect(gamePage).toBeInTheDocument();
    });
});
