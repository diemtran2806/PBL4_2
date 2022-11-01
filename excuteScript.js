import { getCPUInfo } from './loadScripts.js'
// const renderItems = () => {
//     return getCPUInfo.map((item, index) => {document.getElementById("cpu").innerText = item});
// };
// renderItems();
document.getElementById("cpu").innerText = getCPUInfo();