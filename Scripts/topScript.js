const {
  getTopInfo,
  sortFields,
  killProcess,
  startProcess,
  stopProcess,
} = require("../Scripts/loadScripts.js");
let tableTag = document.getElementById("datatable");
let contextMenu = document.getElementById("context-menu");

// Sort top fields
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
let PIDvalue;

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

  // load tasks summary , uptime and load averages summary (header)
  loadTasks(topInfo);
  loadHeader(topInfo);

  // load table fields
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

  // header table
  let head = document.createElement("thead");
  head.setAttribute("id", "headtable");
  tableTag.appendChild(head);
  let row = document.createElement("tr");

  topInfo.fieldNames.forEach((field, index) => {
    // add header field
    let th = document.createElement("th");
    th.setAttribute("class", "head_field");
    th.setAttribute(
      "id",
      field.replace("%", "percent").replace("TIME+", "TIME")
    );
    row.appendChild(th);
    th.innerText = field;

    // add sort icon
    let upIcon = document.createElement("i");
    upIcon.setAttribute("class", "fa-solid fa-chevron-up sort-icon");
    th.appendChild(upIcon);
    let downIcon = document.createElement("i");
    downIcon.setAttribute("class", "fa-solid fa-chevron-down sort-icon");
    th.appendChild(downIcon);

    // add sort event
    th.addEventListener("click", () => {
      sort(index, field.replace("%", "percent").replace("TIME+", "TIME"));
    });
  });
  head.appendChild(row);

  // body table
  var body = document.createElement("tbody");
  body.setAttribute("id", "bodytable");
  tableTag.appendChild(body);
  if (sortFieldId != "none") {
    sortOrder
      ? (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-down"
        ).style.display = "inline-block")
      : (document.querySelector(
          "#" + sortFieldId + " > .fa-chevron-up"
        ).style.display = "inline-block");
  }

  for (var i = 0; i < PID.length - 1; i++) {
    
    // topInfo.fields.forEach((field, index) => {
      let row = document.createElement("tr");
      // row.setAttribute("data-value", `${field['PID']}`);
      // if (PIDvalue == field['PID']) row.style.backgroundColor = "rgba(0,0,0,0.2)";
      row.setAttribute("data-value", `${PID[i]}`);
      if (PIDvalue == PID[i]) row.style.backgroundColor = "rgba(0,0,0,0.2)";
      body.appendChild(row);
  
      row.addEventListener(
        "contextmenu",
        (e) => {
          e.preventDefault();
          PIDvalue = e.target.parentNode.getAttribute("data-value");
          e.target.parentNode.style.backgroundColor = "rgba(0,0,0,0.2)";
          console.log(PIDvalue);
          //vi tri x,y khi nhap chuot
          let mouseX = e.clientX || e.touches[0].clientX;
          let mouseY = e.clientY || e.touches[0].clientY;
          //chieu cao va rong cua menu
          let menuHeight = contextMenu.getBoundingClientRect().height;
          let menuWidth = contextMenu.getBoundingClientRect().width;
          //chieu rong chieu ngang cua mh
          let width = window.innerWidth;
          let height = window.innerHeight;
  
          if (width - mouseX <= 200) {
            contextMenu.style.borderRadius = "5px 0 5px 5px";
            contextMenu.style.left = width - menuWidth + "px";
            contextMenu.style.top = mouseY + "px";
            //ben phai phia duoi
            if (height - mouseY <= 200) {
              contextMenu.style.top = mouseY - menuHeight + "px";
              contextMenu.style.borderRadius = "5px 5px 0 5px";
            }
          }
          //trai
          else {
            contextMenu.style.borderRadius = "0 5px 5px 5px";
            contextMenu.style.left = mouseX + "px";
            contextMenu.style.top = mouseY + "px";
            //trai duoi
            if (height - mouseY <= 200) {
              contextMenu.style.top = mouseY - menuHeight + "px";
              contextMenu.style.borderRadius = "5px 5px 5px 0";
            }
          }
          contextMenu.style.visibility = "visible";
  
          document.getElementById("kill").addEventListener("click", function () {
            killProcess(PIDvalue);
          });
  
          document
            .getElementById("continue")
            .addEventListener("click", function () {
              startProcess(PIDvalue);
            });
  
          document.getElementById("stop").addEventListener("click", function () {
            stopProcess(PIDvalue);
          });
        },
        { passive: false }
      );
      // console.log(field);
    //   Object.keys(field).forEach(function(key, index) {
    //     let td = document.createElement("td");
    //     row.appendChild(td);
    //     td.innerText = field[key];
    //   });
    // });
    row.innerHTML = `<td>${PID[i]}</td>
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
                  <td>${COMMAND[i]}</td>`;
    
  }
}

loadTable(tableTag);
function loadProcessInfor() {
  tableTag.removeChild(document.getElementById("headtable"));
  tableTag.removeChild(document.getElementById("bodytable"));
  loadTable(tableTag);

  //click ben ngoai de tat
  document.addEventListener("click", function (e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.visibility = "hidden";
      PIDvalue = "";
    }
  });
}

setInterval(loadProcessInfor, 1000);
