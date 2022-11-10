const {getMemoryInfo} = require('../Scripts/loadScripts.js')
const MemmoryName = getMemoryInfo.name;
const MemmoryValue = getMemoryInfo.value;

for(var i=0; i<MemmoryName.length; i++) {
        document.getElementById("memory").innerHTML += 
        `<tr>
             <td width="40%">${MemmoryName[i]}</td>
             <td width="60%">${MemmoryValue[i]}</td>
        </tr>`;
}