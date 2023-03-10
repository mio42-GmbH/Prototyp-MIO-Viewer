/* eslint-disable */
import DiseaseDetails from './DiseaseDetails'

export default {
  title: 'DiseaseDetails',
}

export const Default = () => (
  <DiseaseDetails toggleShowDetails={() => console.log('test')} practitionerEntries={[]} records={[]} />
)

Default.story = {
  name: 'default',
}
