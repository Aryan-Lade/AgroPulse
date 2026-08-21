import yieldData from '@/data/yieldPrediction.json'
export const predictYield = (params) => {
  void params
  return Promise.resolve(yieldData.data[0])
}

export const getHistoricalYield = () => {
  return Promise.resolve(yieldData.data)
}
