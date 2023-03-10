import React, { FC } from 'react'
import './InformationHeading.scss'

interface InformationHeadingProps {
  text: string
}

const InformationHeading: FC<InformationHeadingProps> = (props: InformationHeadingProps) => (
  <span className="InformationHeading card-content-heading" data-testid="InformationHeading">
    {props.text}
  </span>
)

export default InformationHeading
