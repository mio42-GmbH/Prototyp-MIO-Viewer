import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PractitionerModal from './PractitionerModal'

describe('<PractitionerModal />', () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  test('it should mount', () => {
    render(<PractitionerModal show={show} handleShow={handleShow} handleClose={handleClose} />)

    const practitionerModal = screen.getByTestId('PractitionerModal')

    expect(practitionerModal).toBeInTheDocument()
  })
})
