import React from 'react';
import { resetMachinesToInitialState } from '../utils/resetMachines';

export default function ResetMachinesButton() {
  return (
    <button
      onClick={resetMachinesToInitialState}
      style={{
        padding: '12px 24px',
        background: '#f87171',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '32px auto',
        display: 'block',
        fontSize: '1.1rem'
      }}
    >
      Reset All Machines to Initial State
    </button>
  );
}
