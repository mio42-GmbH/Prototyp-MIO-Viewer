import React, { useState } from 'react'
import { FC } from 'react'
import './VaccinationPassHeader.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Collapse, Container, Dropdown, Placeholder } from 'react-bootstrap'
import { Vaccination } from '@kbv/mioparser'
import { getFullName, getBirthName, getBirthDate, getGkv } from '../../services/mioParser'
import FilterCard from '../FilterCard/FilterCard'

interface VaccinationPassHeaderProps {
  patient: Vaccination.V1_1_0.Profile.Patient | undefined
}

type CustomToggleProps = {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => unknown
}

const FilterDropDownToggle = React.forwardRef(function CustomToggle(
  props: CustomToggleProps,
  ref: React.Ref<HTMLImageElement>,
) {
  return (
    <img
      role="button"
      src="/assets/icons/menu.svg"
      alt="Menü"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    ></img>
  )
})

type CustomMenuProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  labeledBy?: string
}

const FilterMenu = React.forwardRef(function FilterMenu(props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div ref={ref} style={props.style} className={props.className} aria-labelledby={props.labeledBy}>
      <FilterCard></FilterCard>
    </div>
  )
})

// TODO: more robust solution with e.g. Luxon https://moment.github.io/luxon/#/
const calculateAge = (birthDateString: string) => {
  const today = new Date()
  console.log(today)
  birthDateString = birthDateString.split('.').reverse().join('-') // convert German to ISO date format
  const birthDate = new Date(birthDateString)
  console.log(birthDateString)
  console.log(birthDate)
  let yearDifference = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  // Did not have birthday in current year yet
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    yearDifference = yearDifference - 1
  }
  return yearDifference
}

const VaccinationPassHeader: FC<VaccinationPassHeaderProps> = (props: VaccinationPassHeaderProps) => {
  const [headerExpanded, setHeaderExpanded] = useState(false)

  // This is a simplified version of the component with placeholders.
  // It should be displayed if there is no patient data.
  if (!props.patient) {
    return (
      <Row className="p-4 m-0 bg-white VaccinationPassHeader">
        <Col xs={2} className="p-0">
          <img src="/assets/Logo_Impfpass.svg" alt="Der Digitale Impfpass - Logo"></img>
        </Col>
        <Col>
          <Row>
            <Placeholder animation="glow" />
          </Row>
          <Row>
            <Col>
              <Placeholder animation="glow" />
            </Col>
            <Col>
              <Placeholder animation="glow" />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  const fullName = getFullName(props.patient)
  const birthName = getBirthName(props.patient)
  const birthDate = getBirthDate(props.patient)
  const age = calculateAge(birthDate)
  const gkv = getGkv(props.patient)

  return (
    <div className="pt-4 pb-3 w-100 bg-white VaccinationPassHeader">
      <img className="logo" src="/assets/Logo_Impfpass.svg" alt="Der Digitale Impfpass - Logo"></img>
      <Container className="d-flex justify-content-between align-items-end">
        <div>
          <Row>
            <h1>{fullName}</h1>
          </Row>
          <Row>
            <Col className="d-flex">
              <span>
                Geburtsdatum: {birthDate} ({age} Jahre)
              </span>
              <span className="ms-3">Versichertennummer: {gkv}</span>
              <div className="ms-2">
                {!headerExpanded && (
                  <img
                    src="/assets/icons/chevron_down.svg"
                    alt="Pfeil nach unten"
                    role="button"
                    onClick={() => setHeaderExpanded(true)}
                    aria-controls="collapse-row"
                    aria-expanded={headerExpanded}
                  ></img>
                )}
                {headerExpanded && (
                  <img
                    src="/assets/icons/chevron_up.svg"
                    alt="Pfeil nach oben"
                    role="button"
                    onClick={() => setHeaderExpanded(false)}
                    aria-controls="collapse-row"
                    aria-expanded={headerExpanded}
                  ></img>
                )}
              </div>
            </Col>
          </Row>
          <Collapse in={headerExpanded}>
            <Row id="collapse-row">
              <Col style={{ flex: 0 }}>
                <Row>
                  <span>Geburtsname</span>
                </Row>
                <Row>
                  <span>{birthName}</span>
                </Row>
              </Col>
              <Col className="d-flex align-items-center">
                <div className="me-3 vertical-line table-separator"></div>
                <Col>
                  <Row>
                    <span>Geschlecht</span>
                  </Row>
                  <Row>
                    <span>{props.patient.gender || '-'}</span>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Collapse>
        </div>
        <Dropdown autoClose={true}>
          <Dropdown.Toggle as={FilterDropDownToggle}></Dropdown.Toggle>
          <Dropdown.Menu as={FilterMenu}></Dropdown.Menu>
        </Dropdown>
      </Container>
    </div>
  )
}
export default VaccinationPassHeader
