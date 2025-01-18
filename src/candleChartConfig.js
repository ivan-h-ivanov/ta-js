const candleChartConfig = {
  days: []
};

const today = new Date();
for (let i = 0; i < 1000; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  const low = Math.floor(Math.random() * 100) + 50;
  const high = low + Math.floor(Math.random() * 100) + 10;
  const open = Math.floor(Math.random() * (high - low)) + low;
  const close = Math.floor(Math.random() * (high - low)) + low;
  candleChartConfig.days.push({
    date: date.toISOString().split('T')[0],
    high,
    low,
    open,
    close,
    volume: Math.floor(Math.random() * 1000) + 500
  });
}
