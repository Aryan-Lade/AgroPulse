import { HiOutlineBeaker } from 'react-icons/hi2'
import ModuleShell from '../components/common/ModuleShell.jsx'

function SoilAnalysis() {
  return (
    <ModuleShell
      icon={HiOutlineBeaker}
      accent="amber"
      title="Soil Analysis"
      description="Real-time NPK, pH and moisture insights from in-field sensors with AI-generated fertilization plans."
    />
  )
}

export default SoilAnalysis
