import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DiseaseOverview from './DiseaseOverview'

describe('<DiseaseOverview />', () => {
  test('it should mount', () => {
    render(<DiseaseOverview toggleShowDetails={() => console.log('test')} diseaseOverview={[]} />)

    const diseaseOverview = screen.getByTestId('DiseaseOverview')

    expect(diseaseOverview).toBeInTheDocument()
  })
})
