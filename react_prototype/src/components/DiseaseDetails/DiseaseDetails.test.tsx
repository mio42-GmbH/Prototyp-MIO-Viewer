import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DiseaseDetails from './DiseaseDetails'

describe('<DiseaseDetails />', () => {
  test('it should mount', () => {
    render(<DiseaseDetails toggleShowDetails={() => console.log('test')} practitionerEntries={[]} records={[]} />)

    const diseaseDetails = screen.getByTestId('DiseaseDetails')

    expect(diseaseDetails).toBeInTheDocument()
  })
})
