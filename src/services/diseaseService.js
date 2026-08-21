
import history from '@/data/diseaseHistory.json'
export const analyseImage = (file) => {
  
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


export const getHistory = () => {
  
  return Promise.resolve(history.data)
}

export const getDiseaseById = (id) => {
  const record = history.data.find((d) => d.id === id) ?? null
  return Promise.resolve(record)
}
