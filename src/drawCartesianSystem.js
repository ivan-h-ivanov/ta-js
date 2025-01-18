function drawCartesianSystem(context, canvas, daysToShow, startIndex) {
  const axis = {
    strokeStyle: 'black',
    lineWidth: 2
  };
  context.strokeStyle = axis.strokeStyle;
  context.lineWidth = axis.lineWidth;
  context.beginPath();
  context.moveTo(60, canvas.height - 54);
  context.lineTo(canvas.width, canvas.height - 54);
  context.moveTo(60, 0);
  context.lineTo(60, canvas.height);
  context.stroke();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - startIndex - daysToShow);
  const step = (canvas.width - 60) / daysToShow;
  const ticks = [];
  for (let i = 0; i <= daysToShow; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
    const x = 60 + i * step;
    context.moveTo(x, canvas.height - 54);
    context.lineTo(x, canvas.height - 50);
    ticks.push({ x, dateString });
  }
  context.stroke();

  const yStep = (canvas.height - 54) / 5;
  for (let i = 0; i <= 5; i++) {
    const y = canvas.height - 54 - i * yStep;
    context.moveTo(55, y);
    context.lineTo(65, y);
    context.stroke();
    context.fillText(i * 50, 20, y + 5);
  }

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const tooltip = document.getElementById('tooltip');
    const tick = ticks.find((t, index) => {
      const prevTick = ticks[index - 1];
      return prevTick && mouseX > prevTick.x && mouseX < t.x;
    });
    if (tick && mouseY > canvas.height - 60 && mouseY < canvas.height - 30) {
      tooltip.style.display = 'block';
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 10}px`;
      tooltip.innerHTML = tick.dateString;
    } else {
      tooltip.style.display = 'none';
    }
  });
}

function drawBorder() {
  const canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(0, 0, canvas.width, canvas.height);
  } else {
    console.error('Canvas not supported');
  }
}

export { drawCartesianSystem, drawBorder };
