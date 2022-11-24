const {getTopInfo} = require('../Scripts/loadScripts.js')
let tableTag = document.getElementById("datatable");
let headerTag = document.getElementById("header");
let tasksTag = document.getElementById("tasks");


function loadTasks() {
    const topInfor = getTopInfo();
    let totalTag = document.getElementById("total");
    let runningTag = document.getElementById("running");
    let sleepingTag = document.getElementById("sleeping");
    let stoppedTag = document.getElementById("stopped");
    let zombieTag = document.getElementById("zombie");
    const total = topInfor.summaryDisplay.tasks.total;
    const running = topInfor.summaryDisplay.tasks.running;
    const sleeping = topInfor.summaryDisplay.tasks.sleeping;
    const stopped = topInfor.summaryDisplay.tasks.stopped;
    const zombie = topInfor.summaryDisplay.tasks.zombie;
    var ttotal = document.createElement("div");
        ttotal.setAttribute("id", "ttotal");
        totalTag.appendChild(ttotal);
        document.getElementById("ttotal").innerText = total;
    var trunning = document.createElement("div");
        trunning.setAttribute("id", "trunning");
        runningTag.appendChild(trunning);
        document.getElementById("trunning").innerText = running;
    var tsleeping = document.createElement("div");
        tsleeping.setAttribute("id", "tsleeping");
        sleepingTag.appendChild(tsleeping);
        document.getElementById("tsleeping").innerText = sleeping;
    var tstopped = document.createElement("div");
        tstopped.setAttribute("id", "tstopped");
        stoppedTag.appendChild(tstopped);
        document.getElementById("tstopped").innerText = stopped;
    var tzombie = document.createElement("div");
        tzombie.setAttribute("id", "tzombie");
        zombieTag.appendChild(tzombie);
        document.getElementById("tzombie").innerText = zombie;
}

function loadHeader(headerTag) {
    const topInfor = getTopInfo();
    const command = topInfor.summaryDisplay.uptimeAndLoadAverages.command;
    const currentTime = topInfor.summaryDisplay.uptimeAndLoadAverages.currentSystemTime;
    const systemUptime = topInfor.summaryDisplay.uptimeAndLoadAverages.systemUptime;
    const numUsers = topInfor.summaryDisplay.uptimeAndLoadAverages.numberOfCurrentUsers;
    const numLoadOne = topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastOneMinute;
    const numLoadTwo = topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFiveMinutes;
    const numLoadThree = topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFifteenMinutes;

    var body = document.createElement("tbody");
        body.setAttribute("id", "headerbody");
        headerTag.appendChild(body);
        document.getElementById("headerbody").innerHTML += 
        `<tr>
             <td width="30%">Current System Time: ${currentTime}</td>
             <td width="10%">Up ${systemUptime}</td>
             <td width="20%%">Number of Users: ${numUsers}</td>
             <td width="40%%">Load Averages ${numLoadOne} ${numLoadTwo} ${numLoadThree}</td>
        </tr>`;
}

function loadTable(tableTag) {
    const topInfor = getTopInfo();
const PID = topInfor.fields.PID;
const User = topInfor.fields.User;
const PR = topInfor.fields.PR;
const NI = topInfor.fields.NI;
const VIRT = topInfor.fields.VIRT;
const RES = topInfor.fields.RES;
const SHR = topInfor.fields.SHR;
const S = topInfor.fields.S;
const CPU = topInfor.fields.CPUpercent;
const MEM = topInfor.fields.MEMpercent;
const TIME = topInfor.fields.Time;
const COMMAND = topInfor.fields.Command;
    var head = document.createElement("thead");
    head.setAttribute("id", "headtable");
    tableTag.appendChild(head);
    document.getElementById("headtable").innerHTML += 
        `<tr>
                <th>PID</th>
                <th>User</th>
                <th>PR</th>
                <th>NI</th>
                <th>VIRT</th>
                <th>RES</th>
                <th>SHR</th>
                <th>S</th>
                <th>%CPU</th>
                <th>%MEM</th>
                <th>TIME+</th>
                <th>COMMAND</th>
        </tr>`;
        var body = document.createElement("tbody");
        body.setAttribute("id", "bodytable");
        tableTag.appendChild(body);
        for(var i=0; i<PID.length; i++) {
            document.getElementById("bodytable").innerHTML += 
            `<tr>
                 <td width="8.3%">${PID[i]}</td>
                 <td width="8.3%">${User[i]}</td>
                 <td width="8.3%">${PR[i]}</td>
                 <td width="8.3%">${NI[i]}</td>
                 <td width="8.3%">${VIRT[i]}</td>
                 <td width="8.3%">${RES[i]}</td>
                 <td width="8.3%">${SHR[i]}</td>
                 <td width="8.3%">${S[i]}</td>
                 <td width="8.3%">${CPU[i]}</td>
                 <td width="8.3%">${MEM[i]}</td>
                 <td width="8.3%">${TIME[i]}</td>
                 <td width="8.3%">${COMMAND[i]}</td>
            </tr>`;
    }
}

//load lan dau
loadHeader(headerTag);
loadTasks();
loadTable(tableTag);
function loadProcessInfor() {
    document.getElementById("headerbody").remove();
    document.getElementById("ttotal").remove();
    document.getElementById("trunning").remove();
    document.getElementById("tsleeping").remove();
    document.getElementById("tstopped").remove();
    document.getElementById("tzombie").remove();
    while(tableTag.firstChild) {
        tableTag.removeChild(tableTag.firstChild);
    }
    loadHeader(headerTag);
    loadTasks();
    loadTable(tableTag);
}
setInterval(loadProcessInfor, 5000);
//setInterval(updateData, 5000);

