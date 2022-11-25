//import { getCPUInfo } from '../Scripts/loadScripts.js'
const {getCPUInfo, getMemoryInfo} = require('../Scripts/loadScripts.js')

const name = getCPUInfo.name;
const value = getCPUInfo.value;

for(var i=0; i<name.length-1; i++) {
        document.getElementById("cpu").innerHTML += 
        `<tr>
             <td width="40%">${name[i]}</td>
             <td width="60%">${value[i]}</td>
        </tr>`;
}
