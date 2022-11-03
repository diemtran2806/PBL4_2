// const nodeChildProcess = require('child_process');

// const script = nodeChildProcess.exec("lscpu", { encoding: "utf-8" });
// const getCPUInfo = JSON.stringify(script.toString('utf8')).split(":");

//dufng ni cx dc
// const { execSync } = require("child_process");
// export const getCPUInfo = () => {
//   const output = execSync("lscpu",{encoding: 'utf-8' });
//   return output.split(":");
// }

// const { execSync } = require("child_process");
// export const getCPUInfo = ()=>{
//   execSync("lscpu", { encoding: "utf-8" });
// }


// module.exports = {
//   getCPUInfo
// };
const { execSync } = require("child_process");
const getCPUInfo = () => {
  const output = execSync("lscpu",{encoding: 'utf-8' });
  const cpuInfoArray = {
    name: [],
    value: []
  };
  output.split("\n").map((item) => {
    cpuInfoArray.name.push(item.split(":")[0]);
    cpuInfoArray.value.push(item.split(":")[1]);
  });
  return cpuInfoArray;
}

module.exports = {
  getCPUInfo
};