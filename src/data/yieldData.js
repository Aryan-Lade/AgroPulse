export const yieldData = {
  forecast: {
    predicted: 12.8,
    previous: 11.2,
    unit: "t/ha",
    confidence: 92,
    harvestWindow: "Sep 14 – Sep 28",
  },
  history: [
    { season: "2021", actual: 9.4, predicted: 9.1 },
    { season: "2022", actual: 10.2, predicted: 10.0 },
    { season: "2023", actual: 9.8, predicted: 10.1 },
    { season: "2024", actual: 11.0, predicted: 10.8 },
    { season: "2025", actual: 11.2, predicted: 11.4 },
    { season: "2026", actual: null, predicted: 12.8 },
  ],
  byField: [
    { field: "North Field", crop: "Wheat", predicted: 13.6, change: 6.2 },
    { field: "East Valley", crop: "Corn", predicted: 14.1, change: 4.8 },
    { field: "South Ridge", crop: "Soybean", predicted: 9.7, change: -2.1 },
    { field: "West Plains", crop: "Rice", predicted: 13.9, change: 7.4 },
  ],
  factors: [
    { name: "Rainfall", impact: 82 },
    { name: "Soil Quality", impact: 74 },
    { name: "Temperature", impact: 68 },
    { name: "Pest Pressure", impact: 35 },
    { name: "Irrigation", impact: 79 },
  ],
};
