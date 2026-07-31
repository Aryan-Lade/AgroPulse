import { HiOutlineChartBar } from 'react-icons/hi2'
import ModuleShell from '../components/common/ModuleShell.jsx'

function YieldPrediction() {
  return (
    <ModuleShell
      icon={HiOutlineChartBar}
      accent="primary"
      title="Yield Prediction"
      description="Season-ahead yield forecasts powered by satellite imagery, weather models and historical harvest data."
    />
  )
}

export default YieldPrediction
