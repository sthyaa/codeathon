import React, { useState, useEffect, useRef } from 'react';
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
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [operator, setOperator] = useState({ name: '', id: '', taskName: 'Alert Simulation' });

  // Machine metrics state
  const [idleTime, setIdleTime] = useState(0); // in minutes
  const [loadCycles, setLoadCycles] = useState(0);
  const [engineHours, setEngineHours] = useState(0); // in hours
  const [fuelUsed, setFuelUsed] = useState(0); // in liters
  const [duration, setDuration] = useState(0); // in seconds
  const intervalRef = useRef(null);

  // Thresholds
  const thresholds = {
    idleTime: 30, // min
    loadCycles: 100,
    engineHours: 2000, // hrs
    fuelUsed: 500, // liters
  };

  // Get operator info from localStorage or auth (simulate for now)
  useEffect(() => {
    // Replace with real auth/profile if available
    const op = JSON.parse(localStorage.getItem('operatorProfile') || '{}');
    setOperator({
      name: op.name || 'Operator',
      id: op.id || 'sim-operator',
      taskName: 'Alert Simulation',
    });
  }, []);

  // Start/stop simulation timer
  useEffect(() => {
    if (machineRunning) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setDuration((d) => d + 1);
        }, 1000);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [machineRunning]);

  // Update metrics based on speed/duration
  useEffect(() => {
    if (!machineRunning) return;
    // Every second, update metrics
    // Idle if speed < 2 km/h
    if (speed < 2) {
      setIdleTime((v) => v + 1 / 60); // add 1 sec in min
    }
    // Load cycle: every 5 min at speed > 5 km/h
    if (speed > 5 && duration % 300 === 0 && duration > 0) {
      setLoadCycles((v) => v + 1);
    }
    // Engine hours: every 60 sec = 1/60 hr
    setEngineHours((v) => v + 1 / 3600);
    // Fuel used: proportional to speed (simple model)
    setFuelUsed((v) => v + (speed > 0 ? 0.05 * speed / 60 : 0));
  }, [duration, speed, machineRunning]);

  // Anomaly detection: check if any metric is near/exceeds threshold
  const [anomaly, setAnomaly] = useState(null);
  useEffect(() => {
    let msg = null;
    if (idleTime >= thresholds.idleTime * 0.9) msg = 'Idle time approaching/exceeding safe limit.';
    if (loadCycles >= thresholds.loadCycles * 0.9) msg = 'Load cycles approaching/exceeding safe limit.';
    if (engineHours >= thresholds.engineHours * 0.9) msg = 'Engine hours approaching/exceeding safe limit.';
    if (fuelUsed >= thresholds.fuelUsed * 0.9) msg = 'Fuel usage approaching/exceeding safe limit.';
    setAnomaly(msg);
  }, [idleTime, loadCycles, engineHours, fuelUsed]);

  // Expand Gemini prompt
  const generateAISuggestion = async () => {
    setLoading(true);
    setAiSuggestion("");
    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it"});

    const conditionText = `
- Seat Belt: ${seatBeltFastened ? "Fastened" : "Not Fastened"}
- Machine: ${machineRunning ? "Running" : "Not Running"}
- Speed: ${speed} km/h
- Obstacles Detected: ${obstacles.length > 0 ? obstacles.join(", ") : "None"}
- Idle Time: ${idleTime.toFixed(1)} min (Threshold: ${thresholds.idleTime} min)
- Load Cycles: ${loadCycles} (Threshold: ${thresholds.loadCycles})
- Engine Hours: ${engineHours.toFixed(2)} hrs (Threshold: ${thresholds.engineHours} hrs)
- Fuel Used: ${fuelUsed.toFixed(1)} L (Threshold: ${thresholds.fuelUsed} L)
    `;

    const prompt = `You are a safety assistant for heavy machinery operators. Based on these conditions, provide short, clear safety guidance. If any machine metric is close to or exceeds its threshold, specify what is unusual and why it may be unsafe.

Current status:
${conditionText}

Reply only with the relevant safety message or alert.`;

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

  // Re-run AI suggestion on metric change
  useEffect(() => {
    generateAISuggestion();
    // eslint-disable-next-line
  }, [seatBeltFastened, machineRunning, speed, obstacles, idleTime, loadCycles, engineHours, fuelUsed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--black))] via-[hsl(var(--caterpillar-yellow))/10] to-[hsl(var(--black))] px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[hsl(var(--caterpillar-yellow))]/60 bg-[hsl(var(--black))]/95 relative overflow-hidden animate-fadein">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 rounded-3xl pointer-events-none z-0 bg-gradient-to-br from-[hsl(var(--caterpillar-yellow))/60] via-transparent to-[hsl(var(--black))]/80 blur-[6px] animate-pulse" />
        <div className="relative z-10 p-8 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[hsl(var(--caterpillar-yellow))] shadow-lg animate-glow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--black))]"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-[hsl(var(--caterpillar-yellow))] tracking-tight drop-shadow-lg">Operator Safety Alerts</h1>
              <p className="text-[hsl(var(--white))/70] text-sm font-medium mt-1">Real-time simulation of critical safety conditions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seat Belt Status */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[hsl(var(--black))/90] to-[hsl(var(--caterpillar-yellow))/10] border border-[hsl(var(--caterpillar-yellow))/40] shadow-lg flex flex-col items-center gap-4 animate-fadein">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mb-2 text-[hsl(var(--caterpillar-yellow))] drop-shadow-glow"><path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2"/><rect x="5" y="10" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 18v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2"/></svg>
              <h2 className="font-semibold text-[hsl(var(--white))] mb-2 tracking-wide">Seat Belt</h2>
              <button
                onClick={() => setSeatBeltFastened((prev) => !prev)}
                className={`w-full py-2 rounded-xl font-bold text-lg transition-all duration-300 shadow-md border-2 border-[hsl(var(--caterpillar-yellow))] ${seatBeltFastened ? "bg-green-500/90 text-white animate-pulse" : "bg-red-600/90 text-white animate-shake"}`}
              >
                {seatBeltFastened ? "Fastened" : "Unfastened"}
              </button>
            </div>

            {/* Machine Status */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[hsl(var(--black))/90] to-[hsl(var(--caterpillar-yellow))/10] border border-[hsl(var(--caterpillar-yellow))/40] shadow-lg flex flex-col items-center gap-4 animate-fadein">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mb-2 text-[hsl(var(--caterpillar-yellow))] drop-shadow-glow"><rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2"/></svg>
              <h2 className="font-semibold text-[hsl(var(--white))] mb-2 tracking-wide">Machine</h2>
              <button
                onClick={() => setMachineRunning((prev) => !prev)}
                className={`w-full py-2 rounded-xl font-bold text-lg transition-all duration-300 shadow-md border-2 border-[hsl(var(--caterpillar-yellow))] ${machineRunning ? "bg-green-500/90 text-white animate-pulse" : "bg-gray-700/90 text-white"}`}
              >
                {machineRunning ? "Running" : "Stopped"}
              </button>
            </div>

            {/* Speed */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[hsl(var(--black))/90] to-[hsl(var(--caterpillar-yellow))/10] border border-[hsl(var(--caterpillar-yellow))/40] shadow-lg col-span-1 md:col-span-2 animate-fadein">
              <div className="flex items-center gap-3 mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--caterpillar-yellow))] drop-shadow-glow"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/></svg>
                <h2 className="font-semibold text-[hsl(var(--white))] tracking-wide">Speed</h2>
                <span className="ml-auto text-[hsl(var(--caterpillar-yellow))] font-bold text-lg">{speed} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-[hsl(var(--caterpillar-yellow))] h-2 rounded-lg outline-none transition-all duration-200"
              />
            </div>

            {/* Proximity Hazards */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[hsl(var(--black))/90] to-[hsl(var(--caterpillar-yellow))/10] border border-[hsl(var(--caterpillar-yellow))/40] shadow-lg col-span-1 md:col-span-2 animate-fadein">
              <div className="flex items-center gap-3 mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--caterpillar-yellow))] drop-shadow-glow"><rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/><rect x="11" y="3" width="2" height="18" rx="1" fill="currentColor"/></svg>
                <h2 className="font-semibold text-[hsl(var(--white))] tracking-wide">Proximity Hazards</h2>
              </div>
              <div className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Add Obstacle"
                  value={obstacleInput}
                  onChange={(e) => setObstacleInput(e.target.value)}
                  className="flex-1 p-2 rounded-lg bg-[hsl(var(--black))/70] text-[hsl(var(--white))] border border-[hsl(var(--caterpillar-yellow))/30] focus:border-[hsl(var(--caterpillar-yellow))] outline-none"
                />
                <button
                  onClick={() => {
                    if (obstacleInput.trim()) {
                      setObstacles([...obstacles, obstacleInput]);
                      setObstacleInput("");
                    }
                  }}
                  className="px-4 py-2 bg-[hsl(var(--caterpillar-yellow))] rounded-lg text-[hsl(var(--black))] font-bold shadow hover:bg-[hsl(var(--caterpillar-yellow))/80] transition"
                >
                  Add
                </button>
              </div>
              {obstacles.length > 0 && (
                <ul className="list-disc list-inside space-y-1 mt-2 text-[hsl(var(--caterpillar-yellow))]">
                  {obstacles.map((obs, idx) => (
                    <li key={idx}>{obs}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Machine Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900 rounded-xl p-4 text-yellow-400 text-center">
              <div className="font-bold">Idle Time</div>
              <div>{idleTime.toFixed(1)} min</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-yellow-400 text-center">
              <div className="font-bold">Load Cycles</div>
              <div>{loadCycles}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-yellow-400 text-center">
              <div className="font-bold">Engine Hours</div>
              <div>{engineHours.toFixed(2)} hrs</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-yellow-400 text-center">
              <div className="font-bold">Fuel Used</div>
              <div>{fuelUsed.toFixed(1)} L</div>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="mt-8">
            {loading ? (
              <div className="flex items-center space-x-2 text-[hsl(var(--caterpillar-yellow))] animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Fetching AI Safety Suggestion...</span>
              </div>
            ) : aiSuggestion && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--caterpillar-yellow))/90] to-[hsl(var(--black))/80] border-2 border-[hsl(var(--caterpillar-yellow))] shadow-xl animate-fadein">
                <h3 className="text-lg font-bold text-[hsl(var(--black))] mb-2 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--caterpillar-yellow))]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/></svg>
                  AI Suggestion
                </h3>
                <p className="text-[hsl(var(--caterpillar-yellow))] text-base font-bold drop-shadow-glow">{aiSuggestion}</p>
              </div>
            )}
          </div>

          {/* Anomaly Alert */}
          {anomaly && (
            <div className="p-4 mb-4 bg-red-600 text-white rounded-lg font-bold text-center animate-pulse border-2 border-black">
              ⚠️ {anomaly}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                setLoggingEnabled(false);
                navigate(-1);
              }}
              className="px-6 py-2 rounded-xl font-bold bg-[hsl(var(--black))] text-[hsl(var(--caterpillar-yellow))] border-2 border-[hsl(var(--caterpillar-yellow))] shadow hover:bg-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] transition-all duration-200"
            >
              ⬅ Back
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadein { animation: fadein 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes fadein { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .drop-shadow-glow { filter: drop-shadow(0 0 8px #FFCD11cc); }
        .animate-glow { animation: glow 2s infinite alternate; }
        @keyframes glow { from { box-shadow: 0 0 0 0 #FFCD11; } to { box-shadow: 0 0 24px 8px #FFCD11cc; } }
        .animate-shake { animation: shake 0.4s; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
      `}</style>
    </div>
  );
}