import React, { FC, useState } from 'react'
import { Row, Col, Collapse } from 'react-bootstrap'
import { Vaccination } from '@kbv/mioparser'
import './ConditionEntry.scss'
import Information from '../Information/Information'
import InformationHeading from '../InformationHeading/InformationHeading'
import { ReactComponent as IllnessLogo } from '../../assets/icons/illness.svg'
import { ReactComponent as InfoLogo } from '../../assets/icons/info_grey.svg'
import { ReactComponent as ChevronUpLogo } from '../../assets/icons/chevron_up.svg'
import { ReactComponent as ChevronDownLogo } from '../../assets/icons/chevron_down.svg'

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
            <div className="iconBackdrop condition d-flex align-items-center justify-content-center">
              <IllnessLogo className="h-50" />
            </div>
          </Col>
          <Col xs={4}>
            <Row>
              <span className="entry-title condition">Erkrankung</span>
            </Row>
            <Row>
              <div className="d-flex align-items-center gap-2">
                <Information text={'Zeitraum: TODO'} />
                <InfoLogo role="button" />
              </div>
            </Row>
          </Col>
          <Col xs={3}></Col>
          <Col>
            <div role="button" onClick={() => toggleEntryExpanded()} aria-expanded={entryExpanded} className="d-flex">
              <span>Details</span>
              {!entryExpanded && <ChevronDownLogo />}
              {entryExpanded && <ChevronUpLogo />}
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
                  <Information
                    text={new Date(props.condition.recordedDate).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  />
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
