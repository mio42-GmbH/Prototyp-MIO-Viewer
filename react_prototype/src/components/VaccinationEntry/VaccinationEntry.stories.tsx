/* eslint-disable */
import { Vaccination } from '@kbv/mioparser'
import VaccinationEntry from './VaccinationEntry'

export default {
  title: 'VaccinationEntry',
}

export const Default = () => <VaccinationEntry vaccination={{} as Vaccination.V1_1_0.Profile.RecordPrime} />

Default.story = {
  name: 'default',
}
