const { getDiskInfo } = require("../Scripts/loadScripts.js");

const FileSystem = getDiskInfo.Filesystem;
const Type = getDiskInfo.Type;
const Blocks = getDiskInfo.Blocks;
const Used = getDiskInfo.Used;
const Available = getDiskInfo.Available;
const UsePercent = getDiskInfo.UsePercent;

document.getElementById(
  "headDisks"
).innerHTML += `<tr>                               
                <th>Device</th>
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
                <div class="w3-light-grey">
                    <div class="w3-container w3-deep-purple w3-center" id =${id}>${UsePercent[i]}</div>
                </div>
             </td>
        </tr>`;
  document.getElementById(id).style.width = UsePercent[i];
}
