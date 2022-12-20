const { read } = require("original-fs");
const { getMemoryInfo, getTopInfo } = require("../Scripts/loadScripts.js");
const MemmoryName = getMemoryInfo.name;
const MemmoryValue = getMemoryInfo.value;

for (let i = 0; i < MemmoryName.length - 1; i++) {
  document.getElementById("memory").innerHTML += `<tr>
             <td width="40%">${MemmoryName[i]}</td>
             <td width="60%">${MemmoryValue[i]}</td>
        </tr>`;
}

const ctx = document.getElementById("myChart");
let x = [];
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: x,
    datasets: [
      {
        label: "Memory (%)",
        data: [],
        borderWidth: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
      },
    },
    elements: {
      point: {
        radius: 0,
        borderWidth: 0,
      },
      line: {
        tension: 0.3,
        backgroundColor: "rgb(134, 17, 243)",
        borderColor: "rgb(134, 17, 243)",
      },
    },
  },
});

function addLabel() {
  for (let i = 0; i <= 59; i++) {
    if (i % 5 === 0) {
      x.push(i);
    } else {
      x.push("");
    }
  }
  x.push("60 sec");
}

addLabel();
function addData() {
  let y = Number(getTopInfo().summaryDisplay.memoryUsage.usedPercent);
  console.log(getTopInfo().summaryDisplay.memoryUsage.usedPercent);
  if (chart.data.datasets[0].data.length < 61) {
    chart.data.datasets[0].data.unshift(y);
    chart.data.datasets[0].label = `Memory (${y.toPrecision(4)}%)`;
  } else {
    chart.data.datasets[0].data.pop();
    chart.data.datasets[0].data.unshift(y);
    chart.data.datasets[0].label = `Memory (${y.toPrecision(4)}%)`;
  }
  chart.update();
}

setInterval(addData, 1000);
