// This script will reset all 4 machines to their initial state in Firebase Realtime Database.
// Place this file anywhere in your src/ directory and run its logic from a component or a one-time useEffect.

import { db } from '../lib/firebase';
import { ref as dbRef, set } from 'firebase/database';

const machines = {
  machine1: {
    machineid: 'machine1',
    type: 'Excavator',
    status: 'offline',
    assignedoperatorid: null,
    currenttaskId: null,
    lastUsed: null,
    fuelUsed: Math.floor(Math.random() * 50) + 10, // 10-59
    engineHours: Math.floor(Math.random() * 2000) + 100, // 100-2099
    loadCycles: Math.floor(Math.random() * 100) + 10, // 10-109
    idlingTime: Math.floor(Math.random() * 30) + 5, // 5-34
    seatbeltstatus: false,
    proximityalrt: false,
    safetyalerttriggered: false,
    thresholds: {
      maxIdlingTime: 30, // minutes
      maxEngineHours: 2000, // hours
      maxFuelUsed: 500, // liters or gallons
      maxLoadCycles: 1000 // cycles
    }
  },
  machine2: {
    machineid: 'machine2',
    type: 'Loader',
    status: 'offline',
    assignedoperatorid: null,
    currenttaskId: null,
    lastUsed: null,
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    seatbeltstatus: false,
    proximityalrt: false,
    safetyalerttriggered: false,
    thresholds: {
      maxIdlingTime: 30,
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxLoadCycles: 1000
    }
  },
  machine3: {
    machineid: 'machine3',
    type: 'Bulldozer',
    status: 'offline',
    assignedoperatorid: null,
    currenttaskId: null,
    lastUsed: null,
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    seatbeltstatus: false,
    proximityalrt: false,
    safetyalerttriggered: false,
    thresholds: {
      maxIdlingTime: 30,
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxLoadCycles: 1000
    }
  },
  machine4: {
    machineid: 'machine4',
    type: 'Backhoe',
    status: 'offline',
    assignedoperatorid: null,
    currenttaskId: null,
    lastUsed: null,
    fuelUsed: Math.floor(Math.random() * 50) + 10,
    engineHours: Math.floor(Math.random() * 2000) + 100,
    loadCycles: Math.floor(Math.random() * 100) + 10,
    idlingTime: Math.floor(Math.random() * 30) + 5,
    seatbeltstatus: false,
    proximityalrt: false,
    safetyalerttriggered: false,
    thresholds: {
      maxIdlingTime: 30,
      maxEngineHours: 2000,
      maxFuelUsed: 500,
      maxLoadCycles: 1000
    }
  }
};

export function resetMachinesToInitialState() {
  set(dbRef(db, 'machines'), machines)
    .then(() => {
      alert('Machines reset to initial state!');
    })
    .catch((error) => {
      alert('Error resetting machines: ' + error.message);
    });
}

// Usage:
// Call resetMachinesToInitialState() from a button click or useEffect in your app to run this once.
