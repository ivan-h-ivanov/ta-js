const fs = require('fs');
const path = require('path');

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

const filePath = path.join(__dirname, '../src/candleChartConfig.json');
const dirPath = path.dirname(filePath);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

try {
  fs.writeFileSync(filePath, JSON.stringify(candleChartConfig, null, 2), 'utf-8');
  console.log(`candleChartConfig.json has been saved to ${filePath}`);
} catch (error) {
  console.error(`Failed to save candleChartConfig.json: ${error.message}`);
}
