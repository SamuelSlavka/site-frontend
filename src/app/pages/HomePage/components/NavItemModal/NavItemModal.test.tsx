import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavItemModal from './NavItemModal';


describe('<FormModal />', () => {
  test('it should mount', () => {
    render(<NavItemModal selectedItem={{}} handleChange={()=>{}} triggerUpsert={()=>{}}/>);

    const navItemModal = screen.getByTestId('NavItemModal');

    expect(navItemModal).toBeInTheDocument();
  });
});
