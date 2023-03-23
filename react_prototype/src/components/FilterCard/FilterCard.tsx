import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import Information from '../Information/Information'
import InformationHeading from '../InformationHeading/InformationHeading'
import './FilterCard.scss'
import { ReactComponent as CloseLogo } from '../../assets/icons/close_cross.svg'

// interface FilterCardProps {}

const FilterCard: FC = () => (
  <div className="FilterCard p-3 d-flex flex-column gap-3" data-testid="FilterCard">
    <div role="button" className="d-flex gap-1">
      <CloseLogo />
      <Information text={'Zurücksetzen'} />
    </div>
    <div className="d-flex flex-column">
      <InformationHeading text={'Eintragstyp'} />
      <div>
        <input className="me-2" type="checkbox" id="vaccination" name="entryType" value="vaccination" />
        <label htmlFor="vaccination">Impfungen</label>
      </div>
      <div>
        <input className="me-2" type="checkbox" id="condition" name="entryType" value="condition" />
        <label htmlFor="condition">Erkrankungen</label>
      </div>
    </div>
    <div className="d-flex flex-column">
      <InformationHeading text={'Lebensphase'} />
      <div>
        <input className="me-2" type="checkbox" id="Saeugling" name="lifePhase" value="Saeugling" />
        <label htmlFor="Saeugling">Säugling</label>
      </div>
      <div>
        <input className="me-2" type="checkbox" id="Kleinkind" name="lifePhase" value="Kleinkind" />
        <label htmlFor="Kleinkind">Kleinkind</label>
      </div>
      <div>
        <input className="me-2" type="checkbox" id="Kind" name="lifePhase" value="Kind" />
        <label htmlFor="Kind">Kind</label>
      </div>
    </div>
    <Button disabled={true} className="w-100">
      Apply
    </Button>
  </div>
)

export default FilterCard
