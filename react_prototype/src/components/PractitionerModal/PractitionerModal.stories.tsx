/* eslint-disable */
import { useState } from 'react'
import PractitionerModal from './PractitionerModal'

export default {
  title: 'PractitionerModal',
}

const [show, setShow] = useState(false)
const handleClose = () => setShow(false)
const handleShow = () => setShow(true)

export const Default = () => <PractitionerModal show={show} handleShow={handleShow} handleClose={handleClose} />

Default.story = {
  name: 'default',
}
