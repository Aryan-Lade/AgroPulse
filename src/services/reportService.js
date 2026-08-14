/**
 * reportService.js
 * Returns mock data from reports.json.
 * To connect to a real API:
 *   import api from './api'
 *   export const getReports = (filters) => api.get('/reports', { params: filters })
 */
import reportsData from '@/data/reports.json'

/**
 * Fetch reports, optionally filtered by type, crop, or farmId.
 * @param {object} [filters] — e.g. { reportType: 'monthly', crop: 'Wheat', farmId: 'farm-002' }
 * @returns {Promise<Array>}
 */
export const getReports = (filters = {}) => {
  // TODO: return api.get('/reports', { params: filters })
  let results = reportsData.data

  if (filters.reportType) {
    results = results.filter((r) => r.reportType === filters.reportType)
  }
  if (filters.crop) {
    results = results.filter(
      (r) => r.crop.toLowerCase() === filters.crop.toLowerCase(),
    )
  }
  if (filters.farmId) {
    results = results.filter((r) => r.farmId === filters.farmId)
  }
  if (filters.status) {
    results = results.filter((r) => r.status === filters.status)
  }

  return Promise.resolve(results)
}

/**
 * Request generation of a new report.
 * @param {string} type — report type (e.g. 'monthly', 'drone', 'disease')
 * @param {object} [meta] — additional metadata e.g. { farmId, crop, period }
 * @returns {Promise<object>} the newly created report stub
 */
export const generateReport = (type, meta = {}) => {
  // TODO: return api.post('/reports/generate', { type, ...meta })
  const newReport = {
    id: `rpt-${Date.now()}`,
    farmId: meta.farmId ?? 'farm-001',
    userId: 'user-001',
    name: `${meta.crop ?? 'Farm'}_${type}_${new Date().toISOString().split('T')[0]}.pdf`,
    crop: meta.crop ?? 'General',
    reportType: type,
    generatedDate: new Date().toISOString().split('T')[0],
    status: 'generating',
    sizeKB: 0,
    downloadUrl: null,
    includes: [],
    period: meta.period ?? new Date().toLocaleString('en-IN', { month: 'short', year: 'numeric' }),
  }
  return Promise.resolve(newReport)
}

/**
 * Delete a report by ID.
 * @param {string} id — report ID (e.g. "rpt-001")
 * @returns {Promise<{ success: boolean, id: string }>}
 */
export const deleteReport = (id) => {
  // TODO: return api.delete(`/reports/${id}`)
  return Promise.resolve({ success: true, id })
}

/**
 * Get a download URL for a report.
 * @param {string} id — report ID
 * @returns {Promise<{ downloadUrl: string }>}
 */
export const downloadReport = (id) => {
  // TODO: return api.get(`/reports/${id}/download`)
  const report = reportsData.data.find((r) => r.id === id)
  const url = report?.downloadUrl ?? `/reports/${id}.pdf`
  return Promise.resolve({ downloadUrl: url })
}
