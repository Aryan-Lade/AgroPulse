/**
 * yieldService.js
 * Returns mock data from yieldPrediction.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const predictYield = (params) => api.post('/yield/predict', params)
 */
import yieldData from '@/data/yieldPrediction.json'

/**
 * Predict yield for given crop/field parameters.
 * Mock returns the first prediction record from the dataset.
 * @param {object} params — e.g. { crop, variety, areaSown, fieldId, ... }
 * @returns {Promise<object>}
 */
export const predictYield = (params) => {
  // TODO: return api.post('/yield/predict', params)
  void params
  return Promise.resolve(yieldData.data[0])
}

/**
 * Fetch all historical and current yield prediction records.
 * @returns {Promise<Array>}
 */
export const getHistoricalYield = () => {
  // TODO: return api.get('/yield/history')
  return Promise.resolve(yieldData.data)
}
