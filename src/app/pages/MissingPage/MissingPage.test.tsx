import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MissingPage from "./MissingPage";
import renderer from 'react-test-renderer';
import React from "react";

describe("MissingPage works", () => {
    test("it should mount", () => {
        render(<MissingPage />);

        const missingPage = screen.getByTestId("MissingPage");
        expect(missingPage).toBeInTheDocument();
    });

    test("it should render correnctly", () => {
        const component = renderer.create(
            <MissingPage />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
