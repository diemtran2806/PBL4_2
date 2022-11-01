// const nodeChildProcess = require('child_process');

// const script = nodeChildProcess.exec("lscpu", { encoding: "utf-8" });
// const getCPUInfo = JSON.stringify(script.toString('utf8')).split(":");

const { execSync } = require("child_process");
export const getCPUInfo = () => {
  const output = execSync("lscpu",{encoding: 'utf-8' });
  return output.split(":");
}

// const { execSync } = require("child_process");
// export const getCPUInfo = ()=>{
//   execSync("lscpu", { encoding: "utf-8" });
// }


// module.exports = {
//   getCPUInfo
// };