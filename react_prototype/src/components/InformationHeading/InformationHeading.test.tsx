import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InformationHeading from './InformationHeading'

describe('<InformationHeading />', () => {
  test('it should mount', () => {
    render(<InformationHeading text="Masern" />)

    const informationHeading = screen.getByTestId('InformationHeading')

    expect(informationHeading).toBeInTheDocument()
  })
})
