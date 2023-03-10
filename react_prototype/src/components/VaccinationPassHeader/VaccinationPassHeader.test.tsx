import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VaccinationPassHeader from './VaccinationPassHeader'

describe('<VaccinationPassHeader />', () => {
  test('it should mount', () => {
    render(<VaccinationPassHeader patient={undefined} />)

    const vaccinationPassHeader = screen.getByTestId('VaccinationPassHeader')

    expect(vaccinationPassHeader).toBeInTheDocument()
  })
})
