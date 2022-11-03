import { getCPUInfo, getMemoryInfo, getDiskInfo } from './loadScripts.js';

const nameCPU = getCPUInfo.name.toString().replace(/,/g, "\n");
const valueCPU = getCPUInfo.value.toString().replace(/,/g, "\n");

const nameMem = getMemoryInfo.name.toString().replace(/,/g, "\n");
const valueMem = getMemoryInfo.value.toString().replace(/,/g, "\n");

const Filesystem = getDiskInfo().Filesystem.toString().replace(/,/g, "\n");
const Type = getDiskInfo().Type.toString().replace(/,/g, "\n");
const Blocks = getDiskInfo().Blocks.toString().replace(/,/g, "\n");
const Used = getDiskInfo().Used.toString().replace(/,/g, "\n");
const Available = getDiskInfo().Available.toString().replace(/,/g, "\n");
const UsePercent = getDiskInfo().UsePercent.toString().replace(/,/g, "\n");
const MountedOn = getDiskInfo().MountedOn.toString().replace(/,/g, "\n");
document.getElementById("cpu").innerText = MountedOn;