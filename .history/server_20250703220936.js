const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());

app.post('/predict', (req, res) => {
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

  const py = spawn('python', ['predict_once.py', ...args]);
  let result = '';
  let error = '';

  py.stdout.on('data', (data) => { result += data.toString(); });
  py.stderr.on('data', (data) => { error += data.toString(); });

  py.on('close', (code) => {
    if (code !== 0) {
      res.status(500).json({ error: error || 'Prediction failed' });
    } else {
      res.json({ predicted_time: parseFloat(result) });
    }
  });
});

app.listen(5000, () => console.log('Node.js server running on port 5000'));
