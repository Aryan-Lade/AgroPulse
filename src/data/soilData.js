export const soilData = {
  overview: {
    ph: 6.8,
    moisture: 61,
    temperature: 22.4,
    conductivity: 1.2,
    organicMatter: 4.1,
  },
  nutrients: [
    {
      name: "Nitrogen (N)",
      value: 42,
      optimal: [40, 80],
      unit: "mg/kg",
      status: "moderate",
    },
    {
      name: "Phosphorus (P)",
      value: 58,
      optimal: [30, 60],
      unit: "mg/kg",
      status: "optimal",
    },
    {
      name: "Potassium (K)",
      value: 190,
      optimal: [150, 250],
      unit: "mg/kg",
      status: "optimal",
    },
    {
      name: "Calcium (Ca)",
      value: 1150,
      optimal: [1000, 2000],
      unit: "mg/kg",
      status: "optimal",
    },
    {
      name: "Magnesium (Mg)",
      value: 98,
      optimal: [100, 250],
      unit: "mg/kg",
      status: "low",
    },
  ],
  moistureTrend: [
    { day: "Mon", zoneA: 64, zoneB: 58, zoneC: 61 },
    { day: "Tue", zoneA: 62, zoneB: 55, zoneC: 60 },
    { day: "Wed", zoneA: 60, zoneB: 52, zoneC: 58 },
    { day: "Thu", zoneA: 66, zoneB: 57, zoneC: 62 },
    { day: "Fri", zoneA: 65, zoneB: 60, zoneC: 63 },
    { day: "Sat", zoneA: 63, zoneB: 59, zoneC: 61 },
    { day: "Sun", zoneA: 61, zoneB: 58, zoneC: 60 },
  ],
  recommendations: [
    {
      id: 1,
      title: "Boost nitrogen in Zone B",
      detail: "Apply 25 kg/ha urea before Monday rainfall",
    },
    {
      id: 2,
      title: "Magnesium supplement",
      detail: "Foliar spray of Epsom salt at 2% for deficient plots",
    },
  ],
};
