import soilData from '@/data/soilAnalysis.json'

export const analyseSoil = (params) => {
  void params
  return Promise.resolve(soilData.data[0])
}

export const getSoilHistory = () => {
  return Promise.resolve(soilData.data)
}
