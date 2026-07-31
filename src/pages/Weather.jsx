import { HiOutlineCloud } from 'react-icons/hi2'
import ModuleShell from '../components/common/ModuleShell.jsx'

function Weather() {
  return (
    <ModuleShell
      icon={HiOutlineCloud}
      accent="sky"
      title="Weather Intelligence"
      description="Hyperlocal forecasts, spray-window recommendations and irrigation advisories tailored to every field."
    />
  )
}

export default Weather
