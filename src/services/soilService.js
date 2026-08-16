/**
 * soilService.js
 * Returns mock data from soilAnalysis.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const analyseSoil = (params) => api.post('/soil/analyse', params)
 */
import soilData from '@/data/soilAnalysis.json'

/**
 * Analyse soil parameters and return a result.
 * Mock returns the first sample from the dataset.
 * @param {object} params — e.g. { fieldName, nitrogen, phosphorus, potassium, pH, ... }
 * @returns {Promise<object>}
 */
export const analyseSoil = (params) => {
  // TODO: return api.post('/soil/analyse', params)
  void params
  return Promise.resolve(soilData.data[0])
}

/**
 * Fetch all historical soil analysis samples.
 * @returns {Promise<Array>}
 */
export const getSoilHistory = () => {
  // TODO: return api.get('/soil/history')
  return Promise.resolve(soilData.data)
}
