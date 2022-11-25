const { getDiskInfo } = require("../Scripts/loadScripts.js");

const diskInfo = getDiskInfo;

const FileSystem = diskInfo.Filesystem;
const Type = diskInfo.Type;
const Blocks = diskInfo.Blocks;
const Used = diskInfo.Used;
const Available = diskInfo.Available;
const UsePercent = diskInfo.UsePercent;

document.getElementById(
  "headDisks"
).innerHTML += `<tr>                               
                <th>Files System</th>
                <th>Type</th>
                <th>Total</th>     
                <th>Used</th>     
                <th>Available</th>     
                <th>Used Percent</th>                   
        </tr>`;

for (var i = 0; i < FileSystem.length - 1; i++) {
  let id = "b" + i.toString();
  document.getElementById("bodyDisks").innerHTML += `<tr>
             <td width="20%">${FileSystem[i]}</td>
             <td width="10%">${Type[i]}</td>
             <td width="10%">${Blocks[i]}</td>
             <td width="10%">${Used[i]}</td>
             <td width="10%">${Available[i]}</td>
             <td width="40%">
                <div class="w3-light-grey w3-round">
                    <div class="w3-container w3-round w3-purple" id =${id}>${UsePercent[i]}</div>
                </div>
             </td>
        </tr>`;
  document.getElementById(id).style.width = UsePercent[i];
}
