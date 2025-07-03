// This script will add 4 machines to your Firebase Realtime Database under the 'machines' branch.
// Place this file anywhere in your src/ directory and run its logic from a component or a one-time useEffect.

import { db } from '../lib/firebase';
import { ref as dbRef, set } from 'firebase/database';

const machines = {
  machine1: {
    machineid: 'machine1',
    type: 'Excavator',
    status: 'active',
    assignedoperatorid: 'operatorA',
    currenttaskId: 'task101',
    lastUsed: Date.now(),
    fuelused: 120,
    enginehours: 1530.2,
    loadcycles: 340,
    idlingtime: 12,
    seatbeltstatus: true,
    proximityalrt: false,
    safetyalerttriggered: false
  },
  machine2: {
    machineid: 'machine2',
    type: 'Loader',
    status: 'maintenance',
    assignedoperatorid: 'operatorB',
    currenttaskId: 'task102',
    lastUsed: Date.now(),
    fuelused: 80,
    enginehours: 2100.5,
    loadcycles: 220,
    idlingtime: 20,
    seatbeltstatus: false,
    proximityalrt: false,
    safetyalerttriggered: true
  },
  machine3: {
    machineid: 'machine3',
    type: 'Bulldozer',
    status: 'active',
    assignedoperatorid: 'operatorC',
    currenttaskId: 'task103',
    lastUsed: Date.now(),
    fuelused: 95,
    enginehours: 980.7,
    loadcycles: 150,
    idlingtime: 5,
    seatbeltstatus: true,
    proximityalrt: false,
    safetyalerttriggered: false
  },
  machine4: {
    machineid: 'machine4',
    type: 'Backhoe',
    status: 'offline',
    assignedoperatorid: '',
    currenttaskId: '',
    lastUsed: Date.now(),
    fuelused: 60,
    enginehours: 1200.3,
    loadcycles: 80,
    idlingtime: 30,
    seatbeltstatus: false,
    proximityalrt: true,
    safetyalerttriggered: true
  }
};

export function addMachinesToFirebase() {
  set(dbRef(db, 'machines'), machines)
    .then(() => {
      alert('Machines added successfully!');
    })
    .catch((error) => {
      alert('Error adding machines: ' + error.message);
    });
}

// Usage:
// Call addMachinesToFirebase() from a button click or useEffect in your app to run this once.
