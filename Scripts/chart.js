const {getTopInfo} = require('../Scripts/loadScripts.js');
const y = getTopInfo().summaryDisplay.cpuStates.id;
window.onload = function () {
        
    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title :{
            text: "CPU States"
        },
        data: [{
            type: "line",
            dataPoints: dps
        }],
        axisY: {
            // min: 0,
            // max: 1000,
            title: 'Utilization(%)'
        },
    });
    
    var xVal = 0;
    var yVal = 100; 
    var updateInterval = 1000;
    var dataLength = 60; // number of dataPoints visible at any point
    
    var updateChart = function (count) {
    
        count = count || 1;

        const y = getTopInfo().summaryDisplay.cpuStates.id;
        console.log(y);
        for (var j = 0; j < count; j++) {
            yVal = y;
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
    
        if (dps.length > dataLength) {
            dps.shift();
            // xVal = 0;
        }
    
        chart.render();
    };
    
    updateChart(dataLength);
    setInterval(function(){updateChart()}, updateInterval);
    
    }