import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterCard from './FilterCard';

describe('<FilterCard />', () => {
  test('it should mount', () => {
    render(<FilterCard />);
    
    const filterCard = screen.getByTestId('FilterCard');

    expect(filterCard).toBeInTheDocument();
  });
});