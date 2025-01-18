async function loadCandleChartConfig() {
  const response = await fetch('./src/candleChartConfig.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export default loadCandleChartConfig;
