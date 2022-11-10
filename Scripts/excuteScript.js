//import { getCPUInfo } from '../Scripts/loadScripts.js'
const {getCPUInfo, getMemoryInfo} = require('../Scripts/loadScripts.js')
// const renderItems = () => {
//     return getCPUInfo.map((item, index) => {document.getElementById("cpu").innerText = item});
// };
// renderItems();
// document.getElementById("cpu").innerText = getCPUInfo()[2];
// let text = document.getElementById("cpu").innerText;

// getCPUInfo().name.map(function(item,index) {        //call back
//     //text+= item;
//     document.getElementById("cpu").innerText += item[0];
// })

const name = getCPUInfo.name;
const value = getCPUInfo.value;

for(var i=0; i<name.length-1; i++) {
        document.getElementById("cpu").innerHTML += 
        `<tr>
             <td width="40%">${name[i]}</td>
             <td width="60%">${value[i]}</td>
        </tr>`;
        // document.getElementById("cpu_value").innerHTML += `<li>${value[i]}</li>`;

        // document.getElementById("cpu_name").innerText += name[i] + "\n";
        // document.getElementById("cpu_value").innerText += value[i] + "\n";
}
