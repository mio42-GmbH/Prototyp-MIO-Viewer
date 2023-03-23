import React from 'react'
import { FC } from 'react'
import './VaccinationPassHeader.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container, Dropdown, Placeholder } from 'react-bootstrap'
import { Vaccination } from '@kbv/mioparser'
import { getFullName, getBirthDate, getGkv } from '../../services/mioParser'
import FilterCard from '../FilterCard/FilterCard'
import { ReactComponent as MenuLogo } from '../../assets/icons/menu.svg'
import { ReactComponent as AppLogo } from '../../assets/Logo_Impfpass.svg'

interface VaccinationPassHeaderProps {
  patient: Vaccination.V1_1_0.Profile.Patient | undefined
}

type CustomToggleProps = {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => unknown
}

const FilterDropDownToggle = React.forwardRef(function CustomToggle(
  props: CustomToggleProps,
  ref: React.Ref<SVGSVGElement>,
) {
  return (
    <MenuLogo
      role="button"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        if (props.onClick) {
          props.onClick(e)
        }
      }}
    />
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
  birthDateString = birthDateString.split('.').reverse().join('-') // convert German to ISO date format
  const birthDate = new Date(birthDateString)
  let yearDifference = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  // Did not have birthday in current year yet
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    yearDifference = yearDifference - 1
  }
  return yearDifference
}

const VaccinationPassHeader: FC<VaccinationPassHeaderProps> = (props: VaccinationPassHeaderProps) => {
  // This is a simplified version of the component with placeholders.
  // It should be displayed if there is no patient data.
  if (!props.patient) {
    return (
      <Row className="p-4 m-0 bg-white VaccinationPassHeader">
        <Col xs={2} className="p-0">
          <AppLogo className="logo" />
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
  const birthDate = getBirthDate(props.patient)
  const age = calculateAge(birthDate)
  const gkv = getGkv(props.patient)

  return (
    <div className="pt-4 pb-3 w-100 bg-white VaccinationPassHeader">
      <AppLogo className="logo" />
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
            </Col>
          </Row>
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
