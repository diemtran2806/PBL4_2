
function loadProcessInfor() {
    const {getTopInfo} = require('../Scripts/loadScripts.js')
const PID = getTopInfo.fields.PID;
const User = getTopInfo.fields.User;
const PR = getTopInfo.fields.PR;
const NI = getTopInfo.fields.NI;
const VIRT = getTopInfo.fields.VIRT;
const RES = getTopInfo.fields.RES;
const SHR = getTopInfo.fields.SHR;
const S = getTopInfo.fields.S;
const CPU = getTopInfo.fields.CPUpercent;
const MEM = getTopInfo.fields.MEMpercent;
const TIME = getTopInfo.fields.Time;
const COMMAND = getTopInfo.fields.Command;
var element = document.getElementById("datatable");
var tag = document.createElement("tbody");
tag.setAttribute("id", "toptable");
element.appendChild(tag);
for(var i=0; i<PID.length; i++) {
        document.getElementById("toptable").innerHTML += 
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
console.log("Hello");
const element2 = document.getElementById("toptable");
    element2.remove();
}
function updateData() {
    const element = document.getElementById("toptable");
    element.remove();
}
setInterval(loadProcessInfor, 1000);
// setInterval(updateData, 5000);

