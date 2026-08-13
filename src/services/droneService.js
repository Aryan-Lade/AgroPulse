/**
 * droneService.js
 * Returns mock data from droneAnalysis.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const analyseImage = (file) => { const fd = new FormData(); fd.append('image', file); return api.post('/drone/analyse', fd) }
 */
import droneData from '@/data/droneAnalysis.json'

/**
 * Analyse a drone aerial image.
 * Mock returns the first flight record from the dataset.
 * @param {File} file — drone image file
 * @returns {Promise<object>}
 */
export const analyseImage = (file) => {
  // TODO: const fd = new FormData(); fd.append('image', file); return api.post('/drone/analyse', fd)
  void file
  return Promise.resolve(droneData.data[0])
}

/**
 * Fetch all drone flight analysis records.
 * @returns {Promise<Array>}
 */
export const getFlightHistory = () => {
  // TODO: return api.get('/drone/flights')
  return Promise.resolve(droneData.data)
}
