/* eslint-disable */
import { Vaccination } from '@kbv/mioparser'
import ConditionEntry from './ConditionEntry'

export default {
  title: 'ConditionEntry',
}

export const Default = () => <ConditionEntry condition={{} as Vaccination.V1_1_0.Profile.Condition} />

Default.story = {
  name: 'default',
}
