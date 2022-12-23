import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import NavItem from "./NavItem";
import { BrowserRouter } from "react-router-dom";

describe("NavItem works", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <NavItem editMode={false} item={{ id: "as", icon: "user-secret" }} action={()=>{}} editItem={()=>{}} deleteItem={()=>{}} />
      </BrowserRouter>
    );

    const navItem = screen.getByTestId("NavItem");
    expect(navItem).toBeInTheDocument();
  });

  test("it should render correnctly", () => {
    const component = renderer.create(
      <BrowserRouter>
        <NavItem editMode={false} item={{ id: "as", icon: "user-secret" }} action={()=>{}} editItem={()=>{}} deleteItem={()=>{}} />
      </BrowserRouter>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
