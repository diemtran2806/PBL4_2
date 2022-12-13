const {
  getTopInfo,
  getMultipleCPUInfo,
  cpuCount,
} = require("../Scripts/loadScripts.js");

function description() {
  const topInfor = getTopInfo();
  let utilizationTag = document.getElementById("utilization");
  let uptimeTag = document.getElementById("uptime");
  const utilization = topInfor.summaryDisplay.cpuStates.id;
  const timeup = topInfor.summaryDisplay.uptimeAndLoadAverages.systemUptime;
  let tutilization = document.createElement("div");
  tutilization.setAttribute("id", "tutilization");
  utilizationTag.appendChild(tutilization);
  document.getElementById("tutilization").innerText = utilization + "%";
  let ttimeup = document.createElement("div");
  ttimeup.setAttribute("id", "ttimeup");
  uptimeTag.appendChild(ttimeup);
  document.getElementById("ttimeup").innerText = timeup;
  addData(topInfor);
}

const ctx = document.getElementById("myChart");
let dps = [];
let x = [];
let x2 = [];
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: x,
    datasets: [
      {
        label: "CPU States (% Utilization)",
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
      },
    },
  },
});
const COLORS = [
  'rgb(0, 169, 80)',
  'rgb(246, 112, 25)',
  'rgb(245, 55, 148)',
  'rgb(83, 123, 196)',
  'rgb(172, 194, 54)',
  'rgb(77, 201, 246)',
  'rgb(22, 106, 143)',
  'rgb(88, 89, 91)',
  'rgb(133, 73, 186)'
];
const COLORS_TRAN = [
  'rgba(0, 169, 80, 0.5)',
  'rgba(246, 112, 25, 0.5)',
  'rgba(245, 55, 148, 0.5)',
  'rgba(83, 123, 196, 0.5)',
  'rgba(172, 194, 54, 0.5)',
  'rgba(77, 201, 246, 0.5)',
  'rgba(22, 106, 143, 0.5)',
  'rgba(88, 89, 91, 0.5)',
  'rgba(133, 73, 186, 0.5)'
];
const ctxx = document.getElementById("myChart2");
let chart2 = (() => {
  const datasets = [];
  for (let i = 0; i < cpuCount; i++) {
    datasets.push({
      label: `CPU${i + 1} (%)`,
      data: [],
      borderWidth: 2,
      borderColor: COLORS[i%9],
      backgroundColor: COLORS_TRAN[i%9],
    });
  }
  
  return new Chart(ctxx, {
    type: "line",
    data: {
      labels: x2,
      datasets: datasets,
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
        },
      },
    },
  });
})();
// chart2 = new Chart(ctxx, {
//   type: "line",
//   data: {
//     labels: x2,
//     datasets: datasets,
//   },
//   // data: {
//   //   labels: x2,
//   //   datasets: [
//   //     {
//   //       label: "CPU1 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU2 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU3 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU4 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU5 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU6 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU7 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //     {
//   //       label: "CPU8 (%)",
//   //       data: [],
//   //       borderWidth: 2,
//   //     },
//   //   ],
//   // },
//   options: {
//     maintainAspectRatio: false,
//     animation: false,
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: 100,
//       },
//     },
//     elements: {
//       point: {
//         radius: 0,
//         borderWidth: 0,
//       },
//       line: {
//         tension: 0.3,
//       },
//     },
//   },
// });

function addLabel() {
  for (let i = 0; i <= 59; i++) {
    // x.push(i);
    // x2.push(i);
    if (i % 5 === 0) {
      x.push(i);
      x2.push(i);
    } else {
      x.push("");
      x2.push("");
    }
  }
  x.push("60 sec");
  x2.push("60 sec");
}

addLabel();
function addData(topInfo) {
  let y = 100 - Number(topInfo.summaryDisplay.cpuStates.id.replace(",", "."));
  if (chart.data.datasets[0].data.length < 61) {
    chart.data.datasets[0].data.unshift(y);
    chart.data.datasets[0].label = `CPU States (${y.toPrecision(4)}%)`;
  } else {
    chart.data.datasets[0].data.pop();
    chart.data.datasets[0].data.unshift(y);
    chart.data.datasets[0].label = `CPU States (${y.toPrecision(4)}%)`;
  }
  chart.update();
}

function addData2() {
  let y = getMultipleCPUInfo();
  if (chart2.data.datasets[0].data.length < 61) {
    for (let i = 0; i < cpuCount; i++) {
      chart2.data.datasets[i].data.unshift(y[i]);
      chart2.data.datasets[i].label = `CPU${i + 1} (${y[i]?.toPrecision(4)}%)`;
    }
  } else {
    for (let i = 0; i < cpuCount; i++) {
      chart2.data.datasets[i].data.pop();
      chart2.data.datasets[i].data.unshift(y[i]);      
      chart2.data.datasets[i].label = `CPU${i + 1} (${y[i]?.toPrecision(4)}%)`;
    }
  }
  chart2.update();
}

description();
addData2();
function loadDecription() {
  document.getElementById("tutilization").remove();
  document.getElementById("ttimeup").remove();
  description();
}
setInterval(loadDecription, 1000);
// setInterval(addData,1000);
setInterval(addData2, 1000);
