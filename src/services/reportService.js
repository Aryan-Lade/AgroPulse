
import reportsData from '@/data/reports.json'
export const getReports = (filters = {}) => {
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

export const generateReport = (type, meta = {}) => {
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

export const deleteReport = (id) => {
  return Promise.resolve({ success: true, id })
}

export const downloadReport = (id) => {
  const report = reportsData.data.find((r) => r.id === id)
  const url = report?.downloadUrl ?? `/reports/${id}.pdf`
  return Promise.resolve({ downloadUrl: url })
}
