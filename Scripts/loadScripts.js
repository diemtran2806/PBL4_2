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

const getCPUInfo = getInfoWithNameAndValue('lscpu');
const getMemoryInfo = getInfoWithNameAndValue('cat /proc/meminfo');

let topCommand = 'top -b -n 1';
const getTopInfo = (() => {
  const topInfoArray = {
    summaryDisplay: {
      uptimeAndLoadAverages: {
        command: String,
        currentSystemTime: String,
        systemUptime: String,
        numberOfCurrentUsers: String,
        loadAverage: {
          lastOneMinute: String,
          lastFiveMinutes: String,
          lastFifteenMinutes: String
        }
      },
      tasks: {},
      cpuStates: {},
      memoryUsage: {},
      swapUsage: {}
    },
    fields: {
      PID: [],
      User: [],
      PR: [],
      NI: [],
      VIRT: [],
      RES: [],
      SHR: [],
      S: [],
      CPUpercent: [],
      MEMpercent: [],
      Time: [],
      Command: []
    }
  };
  try {
    // console.log(topCommand);
    const stdout = execSync(topCommand, { encoding: 'utf8' });
    stdout.split("\n").map((item, index) => {
      if (index === 0) {
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.command = item.trimStart().split(/\s+/)[0];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.currentSystemTime = item.trimStart().split(/\s+/)[2];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.systemUptime = item.trimStart().split(/\s+/)[4].slice(0, -1);
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.numberOfCurrentUsers = item.trimStart().split(/\s+/)[5];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastOneMinute = item.trimStart().split(/\s+/)[9].slice(0, -1);
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFiveMinutes = item.trimStart().split(/\s+/)[10].slice(0, -1);
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFifteenMinutes = item.trimStart().split(/\s+/)[11];
      }
      else if (index === 1) {
        topInfoArray.summaryDisplay.tasks[item.split(/\s+/)[2].slice(0, -1)] = item.split(/\s+/)[1];
        topInfoArray.summaryDisplay.tasks[item.split(/\s+/)[4].slice(0, -1)] = item.split(/\s+/)[3];
        topInfoArray.summaryDisplay.tasks[item.split(/\s+/)[6].slice(0, -1)] = item.split(/\s+/)[5];
        topInfoArray.summaryDisplay.tasks[item.split(/\s+/)[8].slice(0, -1)] = item.split(/\s+/)[7];
        topInfoArray.summaryDisplay.tasks[item.split(/\s+/)[10]] = item.split(/\s+/)[9];
      }
      else if (index === 2) {
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[2].slice(0, -1)] = item.split(/\s+/)[1];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[4].slice(0, -1)] = item.split(/\s+/)[3];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[6].slice(0, -1)] = item.split(/\s+/)[5];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[8].slice(0, -1)] = item.split(/\s+/)[7];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[10].slice(0, -1)] = item.split(/\s+/)[9];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[12].slice(0, -1)] = item.split(/\s+/)[11];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[14].slice(0, -1)] = item.split(/\s+/)[13];
        topInfoArray.summaryDisplay.cpuStates[item.split(/\s+/)[16]] = item.split(/\s+/)[15];
      }
      else if (index === 3) {
        topInfoArray.summaryDisplay.memoryUsage[item.split(/\s+/)[4].slice(0, -1)] = item.split(/\s+/)[3];
        topInfoArray.summaryDisplay.memoryUsage[item.split(/\s+/)[6].slice(0, -1)] = item.split(/\s+/)[5];
        topInfoArray.summaryDisplay.memoryUsage[item.split(/\s+/)[8].slice(0, -1)] = item.split(/\s+/)[7];
        topInfoArray.summaryDisplay.memoryUsage[item.split(/\s+/)[10]] = item.split(/\s+/)[9];
        topInfoArray.summaryDisplay.memoryUsage.usedPercent = parseFloat(topInfoArray.summaryDisplay.memoryUsage.used.replace(",", ".")) * 100 / parseFloat(topInfoArray.summaryDisplay.memoryUsage.total.replace(",", "."))
      }
      else if (index === 4) {
        topInfoArray.summaryDisplay.swapUsage[item.split(/\s+/)[3].slice(0, -1)] = item.split(/\s+/)[2];
        topInfoArray.summaryDisplay.swapUsage[item.split(/\s+/)[5].slice(0, -1)] = item.split(/\s+/)[4];
        topInfoArray.summaryDisplay.swapUsage[item.split(/\s+/)[7].slice(0, -1)] = item.split(/\s+/)[6];
        topInfoArray.summaryDisplay.swapUsage[item.split(/\s+/)[9].concat(item.split(/\s+/)[10])] = item.split(/\s+/)[8];
      }
      else if (index > 6) {
        topInfoArray.fields.PID.push(item.trimStart().split(/\s+/)[0]);
        topInfoArray.fields.User.push(item.trimStart().split(/\s+/)[1]);
        topInfoArray.fields.PR.push(item.trimStart().split(/\s+/)[2]);
        topInfoArray.fields.NI.push(item.trimStart().split(/\s+/)[3]);
        topInfoArray.fields.VIRT.push(item.trimStart().split(/\s+/)[4]);
        topInfoArray.fields.RES.push(item.trimStart().split(/\s+/)[5]);
        topInfoArray.fields.SHR.push(item.trimStart().split(/\s+/)[6]);
        topInfoArray.fields.S.push(item.trimStart().split(/\s+/)[7]);
        topInfoArray.fields.CPUpercent.push(item.trimStart().split(/\s+/)[8]);
        topInfoArray.fields.MEMpercent.push(item.trimStart().split(/\s+/)[9]);
        topInfoArray.fields.Time.push(item.trimStart().split(/\s+/)[10]);
        topInfoArray.fields.Command.push(item.trimStart().split(/\s+/)[11]);
      }
    });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  // console.log(topInfoArray);
  return topInfoArray;
});

const sortFields = (sortField, isAscending) => {
  topCommand = topCommand.split(' -o')[0];
  topCommand += isAscending ? ` -o ${sortField}` : ` -o -${sortField}`;
}

const getMultipleCPUInfo = () => {
  const CPUInfoArray = [];
  try {
    execSync('top -1 -b -w 512 -n 1 > top.txt', { encoding: 'utf8' });
    const stdout = execSync('head -n +6 top.txt | tail -n +3', { encoding: 'utf8' });
    stdout.split("\n").map((item) => {
      CPUInfoArray.push(100.0 - parseFloat((item.split(/(?:%Cpu| |:|ni,)+/)[7]).replace(",", ".")));
      CPUInfoArray.push(100.0 - parseFloat((item.split(/(?:%Cpu| |:|ni,)+/)[23]).replace(",", ".")));
    });
    
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  // console.log(CPUInfoArray);
  return CPUInfoArray;
};

const getMultipleCPUInfo1 = () => {
  const CPUInfoArray = [];
  try {
    const stdout = execSync('mpstat -P ALL', { encoding: 'utf8' });
    stdout.split("\n").map((item, index) => {
      if (index > 3 && index < 12) {
        CPUInfoArray.push(100.0 - parseFloat((item.split(/\s+/)[11]).replace(",", ".")));
      }
    });
    console.log(CPUInfoArray);
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  return CPUInfoArray;
};

const getDiskInfo = (() => {
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
})();

module.exports = {
  getCPUInfo,
  getMemoryInfo,
  getDiskInfo,
  getTopInfo,
  getMultipleCPUInfo,
  sortFields,
  // getMultipleCPUInfo1
};