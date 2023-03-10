import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Information from './Information'

describe('<Information />', () => {
  test('it should mount', () => {
    render(<Information text="Masern" />)

    const information = screen.getByTestId('Information')

    expect(information).toBeInTheDocument()
  })
})
