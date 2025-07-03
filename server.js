import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
  console.log('Received /predict request:', req.body); // Log input from frontend
  const {
    task_type,
    machine_type,
    machine_fuel_used,
    engine_hours,
    curr_load_cycles,
    idling_time,
    environmental_conditions,
    operator_level
  } = req.body;

  const args = [
    task_type,
    machine_type,
    machine_fuel_used,
    engine_hours,
    curr_load_cycles,
    idling_time,
    environmental_conditions,
    operator_level
  ].map(String);

  console.log('Args passed to Python:', args); // Log args to Python

  const py = spawn('python', ['predict_once.py', ...args]);
  let result = '';
  let error = '';

  py.stdout.on('data', (data) => { result += data.toString(); });
  py.stderr.on('data', (data) => { error += data.toString(); });

  py.on('close', (code) => {
    if (code !== 0) {
      console.error('Python error:', error); // Log Python errors
      res.status(500).json({ error: error || 'Prediction failed' });
    } else {
      // Split output by lines and use the last non-empty line as prediction
      const lines = result.trim().split('\n');
      const lastLine = lines.reverse().find(line => line.trim() !== '');
      res.json({ predicted_time: parseFloat(lastLine) });
    }
  });
});

app.listen(5000, () => console.log('Node.js server running on port 5000'));