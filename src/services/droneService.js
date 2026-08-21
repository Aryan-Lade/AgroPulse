
import droneData from '@/data/droneAnalysis.json'


export const analyseImage = (file) => {
  void file
  return Promise.resolve(droneData.data[0])
}

export const getFlightHistory = () => {
  return Promise.resolve(droneData.data)
}
