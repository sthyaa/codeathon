import React from 'react';
import { addMachinesToFirebase } from '../utils/addMachines';

export default function PopulateMachinesButton() {
  return (
    <button
      onClick={addMachinesToFirebase}
      style={{
        padding: '12px 24px',
        background: '#facc15',
        color: '#222',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '32px auto',
        display: 'block',
        fontSize: '1.1rem'
      }}
    >
      Populate 4 Machines in Firebase
    </button>
  );
}
