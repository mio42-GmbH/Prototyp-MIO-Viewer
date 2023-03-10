import React, { FC } from 'react'
import './Information.scss'

interface InformationProps {
  text: string
}

const Information: FC<InformationProps> = (props: InformationProps) => (
  <span className="Information" data-testid="Information">
    {props.text}
  </span>
)

export default Information
