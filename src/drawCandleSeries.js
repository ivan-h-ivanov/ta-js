import { drawCartesianSystem } from './drawCartesianSystem.js';

function drawCandleSeries(context, canvas, daysToShow, startIndex, candleChartConfig) {
  const { days } = candleChartConfig;
  const step = (canvas.width - 60) / daysToShow;
  const visibleDays = days.slice(startIndex, startIndex + daysToShow).reverse();

  visibleDays.forEach((day, index) => {
    const x = 60 + index * step + step / 2;
    const candleWidth = step * 0.6;
    const highY = (1 - day.high / 250) * (canvas.height - 54) + 54;
    const lowY = (1 - day.low / 250) * (canvas.height - 54) + 54;
    const openY = (1 - day.open / 250) * (canvas.height - 54) + 54;
    const closeY = (1 - day.close / 250) * (canvas.height - 54) + 54;

    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(x, highY);
    context.lineTo(x, lowY);
    context.stroke();

    context.fillStyle = day.open > day.close ? 'red' : 'green';
    context.fillRect(x - candleWidth / 2, Math.min(openY, closeY), candleWidth, Math.abs(openY - closeY));
  });
}

function drawCandleChart(candleChartConfig) {
  const canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    const context = canvas.getContext('2d');

    let daysToShow = 10;
    let startIndex = 0;
    let isDragging = false;
    let startX;

    const drawChart = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.translate(-canvas.width / 2, -canvas.height / 2);

      drawCartesianSystem(context, canvas, daysToShow, startIndex);
      drawCandleSeries(context, canvas, daysToShow, startIndex, candleChartConfig);

      context.restore();
    };

    drawChart();

    canvas.addEventListener('wheel', (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        daysToShow += event.deltaY * 0.1;
        daysToShow = Math.min(Math.max(10, daysToShow), 100);
        drawChart();
      }
    });

    canvas.addEventListener('mousedown', (event) => {
      isDragging = true;
      startX = event.clientX;
    });

    canvas.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const dx = event.clientX - startX;
        const step = Math.floor(dx / (canvas.width / daysToShow));
        if (step !== 0) {
          startIndex = Math.min(Math.max(0, startIndex + step), candleChartConfig.days.length - daysToShow);
          startX = event.clientX;
          drawChart();
        }
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  } else {
    console.error('Canvas not supported');
  }
}

window.onload = function() {
  drawBorder();
  drawCandleChart();
};

export { drawCandleSeries, drawCandleChart };
