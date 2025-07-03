import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

const genAI = new GoogleGenerativeAI("AIzaSyBCoVrtpha7loGKubxMRHy_qqV_VVyJKys");

export default function AlertsPage() {
  const navigate = useNavigate();
  const [seatBeltFastened, setSeatBeltFastened] = useState(false);
  const [machineRunning, setMachineRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [obstacleInput, setObstacleInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateAISuggestion();
  }, [seatBeltFastened, machineRunning, speed, obstacles]);

  const generateAISuggestion = async () => {
    setLoading(true);
    setAiSuggestion("");
    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it"});

    const conditionText = `
- Seat Belt: ${seatBeltFastened ? "Fastened" : "Not Fastened"}
- Machine: ${machineRunning ? "Running" : "Not Running"}
- Speed: ${speed} km/h
- Obstacles Detected: ${obstacles.length > 0 ? obstacles.join(", ") : "None"}
    `;

    const prompt = `You are a safety assistant for heavy machinery operators. Based on these conditions, provide short, clear safety guidance:

1. Seat belt fastened, machine running — confirm safe operation.
2. Seat belt not fastened, machine running — urgent warning to fasten immediately.
3. Seat belt fastened, machine not running — confirm readiness to operate.
4. Seat belt not fastened, machine not running — remind to fasten seat belt before starting.
5. If speed exceeds 20 km/h — give caution about safe speed.
6. If obstacles are present — alert operator to nearby hazards.

Current status:
${conditionText}

Reply only with the relevant safety message.`;

    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setAiSuggestion(text);
    } catch (err) {
      console.error(err);
      setAiSuggestion("Failed to fetch AI suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 text-white">
      <h1 className="text-3xl font-bold text-yellow-400">Three Alerts Simulation</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="font-medium mb-2">Seat Belt Status</h2>
          <button
            onClick={() => setSeatBeltFastened(!seatBeltFastened)}
            className={`w-full py-2 rounded-lg font-bold ${seatBeltFastened ? "bg-green-600" : "bg-red-600"}`}
          >
            {seatBeltFastened ? "Fastened ✅" : "Unfastened ⚠️"}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="font-medium mb-2">Machine Status</h2>
          <button
            onClick={() => setMachineRunning(!machineRunning)}
            className={`w-full py-2 rounded-lg font-bold ${machineRunning ? "bg-green-600" : "bg-gray-600"}`}
          >
            {machineRunning ? "Running 🏗️" : "Stopped ⛔"}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg col-span-2">
          <h2 className="font-medium mb-2">Speed (km/h)</h2>
          <input
            type="range"
            min="0"
            max="50"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="mt-2">Current Speed: {speed} km/h</p>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg col-span-2 space-y-3">
          <h2 className="font-medium">Proximity Hazards</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add Obstacle"
              value={obstacleInput}
              onChange={(e) => setObstacleInput(e.target.value)}
              className="flex-1 p-2 rounded bg-gray-700"
            />
            <button
              onClick={() => {
                if (obstacleInput.trim()) {
                  setObstacles([...obstacles, obstacleInput]);
                  setObstacleInput("");
                }
              }}
              className="px-4 py-2 bg-yellow-500 rounded-lg text-black font-bold"
            >
              Add
            </button>
          </div>
          {obstacles.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {obstacles.map((obs, idx) => (
                <li key={idx}>{obs}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 text-yellow-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Fetching AI Safety Suggestion...</span>
        </div>
      ) : aiSuggestion && (
        <div className="p-4 bg-yellow-800 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-300">AI Suggestion</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}

      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-700 rounded-lg">⬅ Back</button>
    </div>
  );
}
