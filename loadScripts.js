const { execSync } = require("child_process");

function getInfoWithNameAndValue(command) {
  const infoArray = {
    name: [],
    value: []
  };
  try {
    const stdout = execSync(command, { encoding: 'utf8' });
    stdout.split("\n").map((item) => {
      infoArray.name.push(item.split(":")[0]);
      infoArray.value.push(item.split(":")[1]);
    });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  return infoArray;
}

export const getCPUInfo = getInfoWithNameAndValue('lscpu');
export const getMemoryInfo = getInfoWithNameAndValue('cat /proc/meminfo');
export const getDiskInfo = () => {
  const diskInfoArray = {
    Filesystem: [],
    Type: [],
    Blocks: [],
    Used: [],
    Available: [],
    UsePercent: [],
    MountedOn: []
  };
  try {
    const stdout = execSync('df -T | tail -n +2', { encoding: 'utf8' });
    stdout.replace(/\s{2,}/g, ' ').split("\n").map((item) => {
      diskInfoArray.Filesystem.push(item.split(" ")[0]);
      diskInfoArray.Type.push(item.split(" ")[1]);
      diskInfoArray.Blocks.push(item.split(" ")[2]);
      diskInfoArray.Used.push(item.split(" ")[3]);
      diskInfoArray.Available.push(item.split(" ")[4]);
      diskInfoArray.UsePercent.push(item.split(" ")[5]);
      diskInfoArray.MountedOn.push(item.split(" ")[6]);
    });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  return diskInfoArray;
}