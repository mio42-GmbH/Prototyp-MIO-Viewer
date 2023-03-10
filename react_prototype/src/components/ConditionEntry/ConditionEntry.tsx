import React, { FC, useState } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Vaccination } from '@kbv/mioparser'
import './ConditionEntry.scss'
import Information from '../Information/Information'
import InformationHeading from '../InformationHeading/InformationHeading'

interface ConditionEntryProps {
  condition: Vaccination.V1_1_0.Profile.Condition
}

const ConditionEntry: FC<ConditionEntryProps> = (props: ConditionEntryProps) => {
  const [entryExpanded, setEntryExpanded] = useState(false)
  const toggleEntryExpanded = () => setEntryExpanded(!entryExpanded)

  return (
    <>
      <div className="ConditionEntry" data-testid="ConditionEntry">
        <Row>
          <Col xs={2} className="align-items-center ps-4">
            <div className="icon-backdrop condition d-flex align-items-center justify-content-center">
              <img className="h-50" src="/assets/icons/illness.svg" alt="Symbol für eine Erkrankung"></img>
            </div>
          </Col>
          <Col xs={4}>
            <Row>
              <span className="entry-title condition">Erkrankung</span>
            </Row>
            <Row>
              <div className="d-flex align-items-center gap-2">
                <Information text={'Zeitraum: TODO'} />
                <img role="button" src="/assets/icons/info_grey.svg" alt="Info"></img>
              </div>
            </Row>
          </Col>
          <Col xs={3}></Col>
          <Col>
            <div role="button" onClick={() => toggleEntryExpanded()} aria-expanded={entryExpanded} className="d-flex">
              <span>Details</span>
              {!entryExpanded && <img src="/assets/icons/chevron_down.svg" alt="Pfeil nach unten"></img>}
              {entryExpanded && <img src="/assets/icons/chevron_up.svg" alt="Pfeil nach oben"></img>}
            </div>
          </Col>
        </Row>
        <Collapse in={entryExpanded}>
          <Row>
            <Col>
              <Row>
                <Col xs={2}></Col>
                <Col xs={3}>
                  <InformationHeading text="Dokumentiert am" />
                  <br></br>
                  <Information text={new Date(props.condition.recordedDate).toLocaleDateString()} />
                </Col>
                <Col>
                  <InformationHeading text="Quelle der Information" />
                  <br></br>
                  <Information text={'TODO'} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Collapse>
      </div>
      {/* <PractitionerModal
        show={practitionerModalShow}
        handleShow={() => setPractitionerModalShow(true)}
        handleClose={() => setPractitionerModalShow(false)}
      /> */}
    </>
  )
}

export default ConditionEntry
