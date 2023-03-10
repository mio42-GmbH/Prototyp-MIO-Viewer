import React, { FC, useState } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Vaccination } from '@kbv/mioparser'
import './VaccinationEntry.scss'
import Information from '../Information/Information'
import InformationHeading from '../InformationHeading/InformationHeading'
import PractitionerModal from '../PractitionerModal/PractitionerModal'
import { getVaccinationDisplay, getPractitionerName } from '../../services/mioParser'

interface VaccinationEntryProps {
  vaccination: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum
  attester?: Vaccination.V1_1_0.Profile.Practitioner | Vaccination.V1_1_0.Profile.PractitionerAddendum | undefined
}

const VaccinationEntry: FC<VaccinationEntryProps> = (props: VaccinationEntryProps) => {
  const [practitionerModalShow, setPractitionerModalShow] = useState(false)
  const [entryExpanded, setEntryExpanded] = useState(false)
  const toggleEntryExpanded = () => setEntryExpanded(!entryExpanded)

  let vaccinationCodeDisplay = '-'
  let attesterName = '-'
  vaccinationCodeDisplay = getVaccinationDisplay(props.vaccination)
  if (props.attester) {
    attesterName = getPractitionerName(props.attester)
  }

  return (
    <>
      <div className="VaccinationEntry" data-testid="VaccinationEntry">
        <Row>
          <Col xs={2} className="align-items-center ps-4">
            <div className="icon-backdrop vaccination d-flex align-items-center justify-content-center">
              <img className="h-50" src="/assets/icons/vaccine.svg" alt="Symbol für eine Impfung"></img>
            </div>
          </Col>
          <Col xs={3}>
            <Row>
              <span className="entry-title vaccination">Impfung</span>
            </Row>
            <Row>
              <Information
                text={
                  (props.vaccination.occurrenceDateTime &&
                    new Date(props.vaccination.occurrenceDateTime).toLocaleDateString()) ||
                  '-'
                }
              />
            </Row>
          </Col>
          <Col xs={4}>
            <InformationHeading text="Impfstoff" />
            <br></br>
            <Information text={vaccinationCodeDisplay || '-'} />
          </Col>
          <Col>
            <div role="button" onClick={() => toggleEntryExpanded()} aria-expanded={entryExpanded}>
              <div className="d-flex">
                <span>Details</span>
                {!entryExpanded && <img src="/assets/icons/chevron_down.svg" alt="Pfeil nach unten"></img>}
                {entryExpanded && <img src="/assets/icons/chevron_up.svg" alt="Pfeil nach oben"></img>}
              </div>
              {props.vaccination.note && props.vaccination.note[1] && props.vaccination.note[1].text && (
                <Information text={'Anmerkung'} />
              )}
            </div>
          </Col>
        </Row>
        <Collapse in={entryExpanded}>
          <Row>
            <Col>
              <Row>
                <Col xs={2}></Col>
                <Col xs={3}>
                  <InformationHeading text="Charge" />
                  <br></br>
                  <Information text={props.vaccination.lotNumber || '-'} />
                </Col>
                <Col>
                  <InformationHeading text="Verantwortliche*r" />
                  <br></br>
                  <div role="button" onClick={() => setPractitionerModalShow(true)}>
                    <Information text={attesterName} />
                  </div>
                </Col>
              </Row>
              {props.vaccination.note && props.vaccination.note[1] && props.vaccination.note[1].text && (
                <Row>
                  <Col xs={2}></Col>
                  <Col>
                    <div className="note-box">
                      <img src="/assets/icons/note.svg" alt="Anmerkung"></img>
                      <Information text={props.vaccination.note[1].text} />
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Collapse>
      </div>
      <PractitionerModal
        show={practitionerModalShow}
        handleShow={() => setPractitionerModalShow(true)}
        handleClose={() => setPractitionerModalShow(false)}
      />
    </>
  )
}

export default VaccinationEntry
