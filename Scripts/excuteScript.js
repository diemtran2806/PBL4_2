//import { getCPUInfo } from '../Scripts/loadScripts.js'
const {getCPUInfo} = require('../Scripts/loadScripts.js')
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
// const value = getCPUInfo().value.toString().replace(/,/g, "\n");
//document.getElementById("cpu").innerText = getCPUInfo().name[10];

for(var i=0; i<name.length; i++) {
        // document.getElementById("cpu_name").innerHTML += `<li>${name[i]}</li>`;
        // document.getElementById("cpu_value").innerHTML += `<li>${value[i]}</li>`;
        document.getElementById("cpu_name").innerText += name[i] + "\n";
        document.getElementById("cpu_value").innerText += value[i] + "\n";
}
// for(var i=0; i<value.length; i++) {
//         document.getElementById("cpu_value").innerText += value[i] + "\n";
// }
