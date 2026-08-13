/**
 * diseaseService.js
 * Returns mock data from diseaseHistory.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const analyseImage = (file) => { const fd = new FormData(); fd.append('image', file); return api.post('/disease/analyse', fd) }
 */
import history from '@/data/diseaseHistory.json'

/**
 * Analyse an uploaded crop image for disease.
 * Mock returns a realistic detection result.
 * @param {File} file — image file from an <input type="file">
 * @returns {Promise<object>}
 */
export const analyseImage = (file) => {
  // TODO: const fd = new FormData(); fd.append('image', file); return api.post('/disease/analyse', fd)
  void file
  return Promise.resolve({
    id: `dis-${Date.now()}`,
    diseaseName: 'Late Blight',
    confidence: 94.7,
    severity: 'moderate',
    affectedAreaPercent: 28,
    cropDetected: 'Tomato',
    treatment:
      'Apply Mancozeb 75WP @ 2.5 g/L. Remove and destroy infected leaves immediately. Repeat spray after 7 days.',
    preventionTips: [
      'Ensure adequate plant spacing for air circulation.',
      'Avoid overhead irrigation; switch to drip.',
      'Apply copper-based fungicide as a preventive spray before monsoon.',
    ],
    image: null,
    date: new Date().toISOString().split('T')[0],
    status: 'in-treatment',
    detectedBy: 'Mobile Scan',
  })
}

/**
 * Fetch full disease detection history.
 * @returns {Promise<Array>}
 */
export const getHistory = () => {
  // TODO: return api.get('/disease/history')
  return Promise.resolve(history.data)
}

/**
 * Fetch a single disease record by ID.
 * @param {string} id — disease record ID (e.g. "dis-001")
 * @returns {Promise<object|null>}
 */
export const getDiseaseById = (id) => {
  // TODO: return api.get(`/disease/${id}`)
  const record = history.data.find((d) => d.id === id) ?? null
  return Promise.resolve(record)
}
