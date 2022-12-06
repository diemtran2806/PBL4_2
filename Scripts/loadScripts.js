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
    let result;
    const stdout = execSync(topCommand, { encoding: 'utf8' });
    stdout.split("\n").map((item, index) => {
      if (index === 0) {
        result = item.trimStart().split(/(?: - | up |, | user| load average: )+/);
        // console.log(result);
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.command = result[0];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.currentSystemTime = result[1];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.systemUptime = result[2];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.numberOfCurrentUsers = result[3];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastOneMinute = result[4];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFiveMinutes = result[5];
        topInfoArray.summaryDisplay.uptimeAndLoadAverages.loadAverage.lastFifteenMinutes = result[6];
      }
      else if (index === 1) {
        // result =  item.split(/\s+/);
        result = item.trimStart().split(/(?:Tasks:| |,)+/);
        result.shift();
        // console.log(result);
        topInfoArray.summaryDisplay.tasks[result[1]] = result[0];
        topInfoArray.summaryDisplay.tasks[result[3]] = result[2];
        topInfoArray.summaryDisplay.tasks[result[5]] = result[4];
        topInfoArray.summaryDisplay.tasks[result[7]] = result[6];
        topInfoArray.summaryDisplay.tasks[result[9]] = result[8];
      }
      else if (index === 2) {
        // result = item.split(/\s+/);
        result = item.trimStart().split(/(?:%Cpu\(s\):| |us,|sy,|ni,|id,|wa,|hi,|si,|st)+/);
        result.shift();
        // console.log(result);
        topInfoArray.summaryDisplay.cpuStates['us'] = result[0];
        topInfoArray.summaryDisplay.cpuStates['sy'] = result[1];
        topInfoArray.summaryDisplay.cpuStates['ni'] = result[2];
        topInfoArray.summaryDisplay.cpuStates['id'] = result[3];
        topInfoArray.summaryDisplay.cpuStates['wa'] = result[4];
        topInfoArray.summaryDisplay.cpuStates['hi'] = result[5];
        topInfoArray.summaryDisplay.cpuStates['si'] = result[6];
        topInfoArray.summaryDisplay.cpuStates['st'] = result[7];
      }
      else if (index === 3) {
        result = item.split(/\s+/);
        // result = item.trimStart().split(/(?:MiB Mem| |:|)+/);
        // result.shift();
        // console.log(result);
        topInfoArray.summaryDisplay.memoryUsage[result[4].slice(0, -1)] = result[3];
        topInfoArray.summaryDisplay.memoryUsage[result[6].slice(0, -1)] = result[5];
        topInfoArray.summaryDisplay.memoryUsage[result[8].slice(0, -1)] = result[7];
        topInfoArray.summaryDisplay.memoryUsage[result[10]] = result[9];
        topInfoArray.summaryDisplay.memoryUsage.usedPercent = parseFloat(topInfoArray.summaryDisplay.memoryUsage.used.replace(",", ".")) * 100 / parseFloat(topInfoArray.summaryDisplay.memoryUsage.total.replace(",", "."))
      }
      else if (index === 4) {
        result = item.split(/\s+/);
        topInfoArray.summaryDisplay.swapUsage[result[3].slice(0, -1)] = result[2];
        topInfoArray.summaryDisplay.swapUsage[result[5].slice(0, -1)] = result[4];
        topInfoArray.summaryDisplay.swapUsage[result[7].slice(0, -1)] = result[6];
        topInfoArray.summaryDisplay.swapUsage[result[9].concat(result[10])] = result[8];
      }
      else if (index > 6) {
        result = item.trimStart().split(/\s+/);
        topInfoArray.fields.PID.push(result[0]);
        topInfoArray.fields.User.push(result[1]);
        topInfoArray.fields.PR.push(result[2]);
        topInfoArray.fields.NI.push(result[3]);
        topInfoArray.fields.VIRT.push(result[4]);
        topInfoArray.fields.RES.push(result[5]);
        topInfoArray.fields.SHR.push(result[6]);
        topInfoArray.fields.S.push(result[7]);
        topInfoArray.fields.CPUpercent.push(result[8]);
        topInfoArray.fields.MEMpercent.push(result[9]);
        topInfoArray.fields.Time.push(result[10]);
        topInfoArray.fields.Command.push(result[11]);
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
    // execSync('top -1 -b -w 512 -n 1 > top.txt', { encoding: 'utf8' });
    // const stdout = execSync('head -n +6 top.txt | tail -n +3', { encoding: 'utf8' });
    const stdout = execSync("top -1 -n 1 -b -w 512 | egrep '%Cpu'", { encoding: 'utf8' });
    console.log(stdout);
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
    stdout.split("\n").map((item) => {
      let result = item.split(/\s+/);
      diskInfoArray.Filesystem.push(result[0]);
      diskInfoArray.Type.push(result[1]);
      diskInfoArray.Blocks.push(result[2]);
      diskInfoArray.Used.push(result[3]);
      diskInfoArray.Available.push(result[4]);
      diskInfoArray.UsePercent.push(result[5]);
      diskInfoArray.MountedOn.push(result[6]);
    });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
  // console.log(diskInfoArray);
  return diskInfoArray;
})();

const killProcess = (pid) => {
  try {
    execSync(`kill ${pid}`, { encoding: 'utf8' });
    // execSync(`kill -9 ${pid}`, { encoding: 'utf8' });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
}

const stopProcess = (pid) => {
  try {
    execSync(`kill -STOP ${pid}`, { encoding: 'utf8' });
    // execSync(`kill -15 ${pid}`, { encoding: 'utf8' });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
}

const startProcess = (pid) => {
  try {
    execSync(`kill -CONT ${pid}`, { encoding: 'utf8' });
    // execSync(`kill -18 ${pid}`, { encoding: 'utf8' });
  } catch (err) {
    const { status, stderr } = err;
    if (status > 0 || (stderr && stderr.toLowerCase().includes('warning'))) {
      console.error('Failed due to:');
      console.error(stderr);
      process.exit(1);
    }
  }
}

module.exports = {
  getCPUInfo,
  getMemoryInfo,
  getDiskInfo,
  getTopInfo,
  getMultipleCPUInfo,
  sortFields,
  killProcess,
  stopProcess,
  startProcess,
  // getMultipleCPUInfo1
};