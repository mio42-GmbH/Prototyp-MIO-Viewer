import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ConditionEntry from './ConditionEntry'
import { Vaccination } from '@kbv/mioparser'

describe('<ConditionEntry />', () => {
  test('it should mount', () => {
    render(<ConditionEntry condition={{} as Vaccination.V1_1_0.Profile.Condition} />)

    const conditionEntry = screen.getByTestId('ConditionEntry')

    expect(conditionEntry).toBeInTheDocument()
  })
})
