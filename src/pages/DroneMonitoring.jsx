import { HiOutlinePaperAirplane } from 'react-icons/hi2'
import ModuleShell from '../components/common/ModuleShell.jsx'

function DroneMonitoring() {
  return (
    <ModuleShell
      icon={HiOutlinePaperAirplane}
      accent="sky"
      title="Drone Monitoring"
      description="Command your autonomous fleet — live telemetry, NDVI mapping missions and precision spraying routes."
    />
  )
}

export default DroneMonitoring
