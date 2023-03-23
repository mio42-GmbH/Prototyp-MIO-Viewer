/* eslint-disable */
import DiseaseOverview from './DiseaseOverview'

export default {
  title: 'DiseaseOverview',
}

export const Default = () => (
  <DiseaseOverview
    selectedDisease=""
    setSelectedDisease={() => console.log('test')}
    toggleShowDetails={() => console.log('test')}
    diseaseOverview={[]}
  />
)

Default.story = {
  name: 'default',
}
