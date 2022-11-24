const {getTopInfo} = require('../Scripts/loadScripts.js');

function description() {
  const topInfor = getTopInfo();
  let utilizationTag = document.getElementById("utilization");
  let uptimeTag = document.getElementById("uptime");
  const utilization = topInfor.summaryDisplay.cpuStates.id;
  const timeup = topInfor.summaryDisplay.uptimeAndLoadAverages.systemUptime;
  var tutilization = document.createElement("div");
      tutilization.setAttribute("id", "tutilization");
      utilizationTag.appendChild(tutilization);
      document.getElementById("tutilization").innerText = utilization + "%";
  var ttimeup = document.createElement("div");
      ttimeup.setAttribute("id", "ttimeup");
      uptimeTag.appendChild(ttimeup);
      document.getElementById("ttimeup").innerText = timeup;
}

description();
function loadDecription() {
    document.getElementById("tutilization").remove();
    document.getElementById("ttimeup").remove();
    description();
}
setInterval(loadDecription, 1000);

const ctx = document.getElementById('myChart');
  //const {getTopInfo} = require('../Scripts/loadScripts.js');
  const {getMultipleCPUInfo} = require('../Scripts/loadScripts.js');
  var dps = [];
  var x = [];
  var x2 = [];
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: 'CPU States (% Utilization)',
        data: [],
        borderWidth: 2
      }
    ]
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
            beginAtZero: true,
        },
        y: {
          beginAtZero: true
        }
      },
      elements: {
        point: {
          radius:0,
          borderWidth:0
        },
        line: {
          tension: 0.3
        }
      }
    }
  });
  const ctxx = document.getElementById('myChart2');
  var chart2 = new Chart(ctxx, {
    type: 'line',
    data: {
      labels: x2,
      datasets: [{
        label: 'CPU1 (%)',
        data: [],
        borderWidth: 2
      },
      {
        label: 'CPU2 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU3 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU4 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU5 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU6 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU7 (%)',
        data: [],
        borderWidth: 2
      }
      ,
      {
        label: 'CPU8 (%)',
        data: [],
        borderWidth: 2
      }
    ]
    },
    options: {
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
            beginAtZero: true,
        },
        y: {
          beginAtZero: true
        }
      },
      elements: {
        point: {
          radius:0,
          borderWidth:0
        },
        line: {
          tension: 0.3
        }
      }
    }
  });
  function addLabel() {
    for(var i=0; i<=59;i++) {
        // x.push(i);
        // x2.push(i);
        if((i%5) === 0) {
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
  function addData() {
    var y = Number(getTopInfo().summaryDisplay.cpuStates.id.replace(',','.'));
    if(chart.data.datasets[0].data.length < 61) {
        chart.data.datasets[0].data.unshift(y);
    } else {
        chart.data.datasets[0].data.pop();
        chart.data.datasets[0].data.unshift(y);
    }
    chart.update();
  }
  function addData2() {
    var y = getMultipleCPUInfo();
    if(chart2.data.datasets[0].data.length < 61) {
        for(var i = 0; i<8; i++) {
          chart2.data.datasets[i].data.unshift(y[i]);
        }
    } else {
        for(var i = 0; i<8; i++) {
          chart2.data.datasets[i].data.pop();
          chart2.data.datasets[i].data.unshift(y[i]);
        }
    }
    chart2.update();
  }
  setInterval(addData,1000);
  setInterval(addData2,1000);
