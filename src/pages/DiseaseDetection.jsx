import { HiOutlineBugAnt } from 'react-icons/hi2'
import ModuleShell from '../components/common/ModuleShell.jsx'

function DiseaseDetection() {
  return (
    <ModuleShell
      icon={HiOutlineBugAnt}
      accent="rose"
      title="AI Disease Detection"
      description="Upload leaf images and let our vision models identify diseases with lab-grade accuracy, plus instant treatment plans."
    />
  )
}

export default DiseaseDetection
