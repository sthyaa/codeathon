// Script to populate initial machine data with random values for required fields
import { db } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

const initialMachines = [
  {
    machineid: 'MACH-001',
    type: 'Excavator',
    fuelUsed: Math.floor(Math.random() * 50) + 10, // 10-59
    engineHours: Math.floor(Math.random() * 2000) + 100, // 100-2099
    loadCycles: Math.floor(Math.random() * 100) + 10, // 10-109
    idlingTime: Math.floor(Math.random() * 30) + 5, // 5-34
    thresholds: {
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxIdlingTime: 30,
      maxLoadCycles: 1000
    },
    status: 'offline',
    seatbeltstatus: false,
    safetyalerttriggered: false
  },
  {
    machineid: 'MACH-002',
    type: 'Loader',
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    thresholds: {
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxIdlingTime: 30,
      maxLoadCycles: 1000
    },
    status: 'offline',
    seatbeltstatus: false,
    safetyalerttriggered: false
  },
  {
    machineid: 'MACH-003',
    type: 'Bulldozer',
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    thresholds: {
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxIdlingTime: 30,
      maxLoadCycles: 1000
    },
    status: 'offline',
    seatbeltstatus: false,
    safetyalerttriggered: false
  },
  {
    machineid: 'MACH-004',
    type: 'Grader',
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    thresholds: {
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxIdlingTime: 30,
      maxLoadCycles: 1000
    },
    status: 'offline',
    seatbeltstatus: false,
    safetyalerttriggered: false
  }
];

export async function populateInitialMachineData() {
  for (const machine of initialMachines) {
    await set(ref(db, `machines/${machine.machineid}`), machine);
  }
  // eslint-disable-next-line no-console
  console.log('Initial machine data populated.');
}
