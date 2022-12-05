const { getTopInfo, sortFields } = require("../Scripts/loadScripts.js");
let tableTag = document.getElementById("datatable");
let tasksTag = document.getElementById("tasks");

let isAscending = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];
let sortFieldId = "none";
let sortOrder = true;

function sort(index, field) {
  sortFields(
    field.replace("percent", "%").replace("TIME", "TIME+"),
    isAscending[index]
  );
  isAscending[index]
    ? (document.querySelector(
        "#" + field + " > .fa-chevron-down"
      ).style.display = "inline-block")
    : (document.querySelector("#" + field + " > .fa-chevron-up").style.display =
        "inline-block");

  if (sortFieldId != "none") {
    sortOrder
      ? (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-down"
        ).style.display = "none")
      : (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-up"
        ).style.display = "none");
  }

  sortOrder = isAscending[index];
  sortFieldId = field;
  isAscending[index] = !isAscending[index];
}

function loadTasks(topInfor) {
  // const topInfor = getTopInfo();
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

function loadHeader(topInfor) {
  let currentSysTimeTag = document.getElementById("currentSystemTime");
  let upTimeTag = document.getElementById("upTime");
  let numOfUserTag = document.getElementById("numOfUser");
  let loadAveTag = document.getElementById("loadAve");
  const currentTime =
    topInfor.summaryDisplay.uptimeAndLoadAverages.currentSystemTime;
  const systemUptime =
    topInfor.summaryDisplay.uptimeAndLoadAverages.systemUptime;
  const numUsers =
    topInfor.summaryDisplay.uptimeAndLoadAverages.numberOfCurrentUsers;
  const numLoadOne =
    topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastOneMinute;
  const numLoadTwo =
    topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFiveMinutes;
  const numLoadThree =
    topInfor.summaryDisplay.uptimeAndLoadAverages.loadAverage
      .lastFifteenMinutes;
  var tcurrentSysTime = document.createElement("div");
  tcurrentSysTime.setAttribute("id", "tcurrentSysTime");
  currentSysTimeTag.appendChild(tcurrentSysTime);
  document.getElementById("tcurrentSysTime").innerText = currentTime;

  var tupTime = document.createElement("div");
  tupTime.setAttribute("id", "tupTime");
  upTimeTag.appendChild(tupTime);
  document.getElementById("tupTime").innerText = systemUptime;

  var tnumOfUsers = document.createElement("div");
  tnumOfUsers.setAttribute("id", "tnumOfUsers");
  numOfUserTag.appendChild(tnumOfUsers);
  document.getElementById("tnumOfUsers").innerText = numUsers;

  var tloadAve = document.createElement("div");
  tloadAve.setAttribute("id", "tloadAve");
  loadAveTag.appendChild(tloadAve);
  document.getElementById("tloadAve").innerText =
    numLoadOne + " " + numLoadTwo + " " + numLoadThree;
}

function loadTable(tableTag) {
  const topInfo = getTopInfo();
  loadTasks(topInfo);
  loadHeader(topInfo);
  const PID = topInfo.fields.PID;
  const User = topInfo.fields.User;
  const PR = topInfo.fields.PR;
  const NI = topInfo.fields.NI;
  const VIRT = topInfo.fields.VIRT;
  const RES = topInfo.fields.RES;
  const SHR = topInfo.fields.SHR;
  const S = topInfo.fields.S;
  const CPU = topInfo.fields.CPUpercent;
  const MEM = topInfo.fields.MEMpercent;
  const TIME = topInfo.fields.Time;
  const COMMAND = topInfo.fields.Command;
  var head = document.createElement("thead");
  head.setAttribute("id", "headtable");
  tableTag.appendChild(head);
  document.getElementById(
    "headtable"
  ).innerHTML = `<tr>                               
                <th id="PID">
                  PID
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="USER">
                  User
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="PR">
                  PR
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="NI">
                  NI
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="VIRT">
                  VIRT
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="RES">
                  RES
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="SHR">
                  SHR
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="S">
                  S
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="percentCPU">
                  %CPU
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="percentMEM">
                  %MEM
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="TIME">
                  TIME+
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>
                
                <th id="COMMAND">
                  COMMAND
                  <i class="fa-solid fa-chevron-up sort-icon" ></i>     
                  <i class="fa-solid fa-chevron-down sort-icon"></i>
                </th>                
        </tr>`;
  var body = document.createElement("tbody");
  body.setAttribute("id", "bodytable");
  tableTag.appendChild(body);
  document.getElementById("bodytable").innerHTML = "";
  if (sortFieldId != "none") {
    sortOrder
      ? (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-down"
        ).style.display = "inline-block")
      : (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-up"
        ).style.display = "inline-block");
  }
  for (var i = 0; i < PID.length; i++) {
    document.getElementById("bodytable").innerHTML += `<tr>
                 <td>${PID[i]}</td>
                 <td>${User[i]}</td>
                 <td>${PR[i]}</td>
                 <td>${NI[i]}</td>
                 <td>${VIRT[i]}</td>
                 <td>${RES[i]}</td>
                 <td>${SHR[i]}</td>
                 <td>${S[i]}</td>
                 <td>${CPU[i]}</td>
                 <td>${MEM[i]}</td>
                 <td>${TIME[i]}</td>
                 <td>${COMMAND[i]}</td>
            </tr>`;
  }
  document.getElementById("PID").onclick = function () {
    sort(0, "PID");
  };
  document.getElementById("USER").onclick = function () {
    sort(1, "USER");
  };
  document.getElementById("PR").onclick = function () {
    sort(2, "PR");
  };
  document.getElementById("NI").onclick = function () {
    sort(3, "NI");
  };
  document.getElementById("VIRT").onclick = function () {
    sort(4, "VIRT");
  };
  document.getElementById("RES").onclick = function () {
    sort(5, "RES");
  };
  document.getElementById("SHR").onclick = function () {
    sort(6, "SHR");
  };
  document.getElementById("S").onclick = function () {
    sort(7, "S");
  };
  document.getElementById("percentCPU").onclick = function () {
    sort(8, "percentCPU");
  };
  document.getElementById("percentMEM").onclick = function () {
    sort(9, "percentMEM");
  };
  document.getElementById("TIME").onclick = function () {
    sort(10, "TIME");
  };
  document.getElementById("COMMAND").onclick = function () {
    sort(11, "COMMAND");
  };
}

//load lan dau
// loadHeader();
// loadTasks();
loadTable(tableTag);
function loadProcessInfor() {
  // document.getElementById("ttotal").remove();
  // document.getElementById("trunning").remove();
  // document.getElementById("tsleeping").remove();
  // document.getElementById("tstopped").remove();
  // document.getElementById("tzombie").remove();
  // document.getElementById("tcurrentSysTime").remove();
  // document.getElementById("tupTime").remove();
  // document.getElementById("tnumOfUsers").remove();
  // document.getElementById("tloadAve").remove();
  // while (tableTag.firstChild) {
  //   tableTag.removeChild(tableTag.firstChild);
  // }
  // loadHeader();
  // loadTasks();
  loadTable(tableTag);
}

setInterval(loadProcessInfor, 3000);
