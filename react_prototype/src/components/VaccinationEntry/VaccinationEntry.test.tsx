import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VaccinationEntry from './VaccinationEntry'
import { Vaccination } from '@kbv/mioparser'

describe('<VaccinationEntry />', () => {
  test('it should mount', () => {
    render(<VaccinationEntry vaccination={{} as Vaccination.V1_1_0.Profile.RecordPrime} />)

    const vaccinationEntry = screen.getByTestId('VaccinationEntry')

    expect(vaccinationEntry).toBeInTheDocument()
  })
})
