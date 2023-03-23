import { Vaccination, MIOEntry } from '@kbv/mioparser'
import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import { getAttesterUUID, getPractitionerByUUID } from '../../services/mioParser'
import ConditionEntry from '../ConditionEntry/ConditionEntry'
import VaccinationEntry from '../VaccinationEntry/VaccinationEntry'
import './DiseaseDetails.scss'
import { ReactComponent as CloseLogo } from '../../assets/icons/close_cross.svg'

interface DiseaseDetailsProps {
  records: (
    | Vaccination.V1_1_0.Profile.RecordPrime
    | Vaccination.V1_1_0.Profile.RecordAddendum
    | Vaccination.V1_1_0.Profile.Condition
  )[]
  practitionerEntries: (
    | MIOEntry<Vaccination.V1_1_0.Profile.Practitioner>
    | MIOEntry<Vaccination.V1_1_0.Profile.PractitionerAddendum>
  )[]
  toggleShowDetails: () => void
}

const DiseaseDetails: FC<DiseaseDetailsProps> = (props: DiseaseDetailsProps) => (
  <div className="DiseaseDetails" data-testid="DiseaseDetails">
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>Card Title</Card.Title>
          <CloseLogo role="button" onClick={() => props.toggleShowDetails()} />
        </div>
        {props.records.map((record, index) => {
          if (!Vaccination.V1_1_0.Profile.Condition.is(record)) {
            const attesterUUID = getAttesterUUID(record)
            const attester = getPractitionerByUUID(props.practitionerEntries, attesterUUID)
            console.log('attester', attester)
            return (
              <div key={index} className="entry-container">
                <VaccinationEntry vaccination={record} attester={attester} />
              </div>
            )
          } else {
            return (
              <div key={index} className="entry-container">
                <ConditionEntry condition={record} />
              </div>
            )
          }
        })}
      </Card.Body>
    </Card>
  </div>
)

export default DiseaseDetails
