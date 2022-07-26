import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import NavItem from './NavItem';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


describe('NavItem works', () => {
  test('it should mount', () => {
    render(<NavItem name="name" link='' icon={solid('user-secret')} />);

    const navItem = screen.getByTestId('NavItem');
    expect(navItem).toBeInTheDocument();
  });

  test("it should render correnctly", () => {
    const component = renderer.create(
      <NavItem name="name" link='' icon={solid('user-secret')} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});