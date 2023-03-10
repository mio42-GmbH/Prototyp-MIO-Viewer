import React, { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './PractitionerModal.scss'

interface PractitionerModalProps {
  show: boolean
  handleClose: () => void
  handleShow: () => void
}

const PractitionerModal: FC<PractitionerModalProps> = (props: PractitionerModalProps) => (
  <Modal
    centered
    show={props.show}
    onHide={() => props.handleClose()}
    onShow={() => props.handleShow()}
    data-testid="PractitionerModal"
    dialogClassName="PractitionerModal"
  >
    <Modal.Body>
      <h2>Verantwortliche Person</h2>
      <p>TODO</p>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={() => props.handleClose()}>
          Schließen
        </Button>
      </div>
    </Modal.Body>
  </Modal>
)

export default PractitionerModal
