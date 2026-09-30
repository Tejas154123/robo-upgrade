/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  TrendingUp, 
  Cpu, 
  Layers
} from 'lucide-react';

interface GridPoint {
  x: number;
  y: number;
  type: 'empty' | 'obstacle' | 'inspected' | 'hazard';
  gasLevel: number;
  temp: number;
}

export const EnvironmentalAnalysis: React.FC = () => {
  // Conceptual Inspection Simulation Grid State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [roverPos, setRoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [inspectedPoints, setInspectedPoints] = useState<{ [key: string]: { gas: number; alert: boolean } }>({});
  const [anomaliesFound, setAnomaliesFound] = useState(0);

  const gridSize = 6;
  // Pre-configured hypothetical obstacles and a hotspot
  const obstacles = ['1,1', '1,4', '3,2', '4,2'];
  const hotspot = '4,4';

  const resetSimulation = () => {
    setIsPlaying(false);
    setRoverPos({ x: 0, y: 0 });
    setInspectedPoints({});
    setAnomaliesFound(0);
    setActiveStep(1);
  };

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setRoverPos((prev) => {
          let nextX = prev.x + 1;
          let nextY = prev.y;

          if (nextX >= gridSize) {
            nextX = 0;
            nextY = prev.y + 1;
          }

          if (nextY >= gridSize) {
            setIsPlaying(false);
            return { x: 0, y: 0 };
          }

          // Check if obstacle
          const key = `${nextX},${nextY}`;
          if (obstacles.includes(key)) {
            // "Avoided obstacle" step
            setActiveStep(2);
            return { x: Math.min(gridSize - 1, nextX + 1), y: nextY };
          }

          // Register inspection
          const isHot = key === hotspot;
          const gasVal = isHot ? 2840 : 420 + Math.floor(Math.random() * 80);
          
          setInspectedPoints((prevPoints) => ({
            ...prevPoints,
            [key]: { gas: gasVal, alert: isHot }
          }));

          if (isHot) {
            setAnomaliesFound(prevCount => prevCount + 1);
            setActiveStep(5);
          } else {
            setActiveStep(3);
          }

          return { x: nextX, y: nextY };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const workflowSteps = [
    {
      num: 1,
      title: 'Rover Patrols Designated Area',
      desc: 'Autonomous rover follows programmatic waypoints or random-walk coverage across the room.',
    },
    {
      num: 2,
      title: 'Rover Navigates Around Obstacles',
      desc: 'Front ultrasonic sensor detects furniture, walls, or debris and calculates evasive bypass paths.',
    },
    {
      num: 3,
      title: 'E-Nose Measures Environmental Conditions',
      desc: 'Chemical sensors continuously sample volatile resistance changes alongside ambient temperature and humidity.',
    },
    {
      num: 4,
      title: 'Sensor Data Is Analyzed',
      desc: 'Microcontroller baseline ratio (Rs/R0) algorithm assesses deviations from clean-air references.',
    },
    {
      num: 5,
      title: 'Abnormal Readings Can Be Flagged',
      desc: 'Threshold comparator triggers visual and acoustic alerts when gas levels exceed baseline limits.',
    },
    {
      num: 6,
      title: 'Results Displayed on Central Dashboard',
      desc: 'Real-time 2D spatial heatmap displays inspected zones and hazardous hot spots.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Prominent Concept / Future Integration Disclaimer */}
      <div className="rounded-xl bg-purple-950/40 border-2 border-purple-500/50 p-4 sm:p-5 flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 shrink-0 mt-0.5">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700">
              CONCEPT / FUTURE INTEGRATION
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Visionary Mission Architecture (Planned Roadmap)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Because our current exhibition hardware features <strong>two independent ESP32 systems</strong>, the automated inspection workflow below illustrates what the combined system will achieve once inter-chip communication is established.
          </p>
        </div>
      </div>

      {/* 6-Step Workflow Breakdown */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-2xl font-bold text-white">Conceptual 6-Step Inspection Pipeline</h3>
          <p className="text-slate-400 text-sm mt-1">
            The intended sequence of operations during an industrial or laboratory sweep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step) => {
            const isCurrent = activeStep === step.num;
            return (
              <div
                key={step.num}
                className={`p-5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#101b33] border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-[#0b111e] border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                    isCurrent ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    0{step.num}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold animate-pulse">
                      Active Step
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Conceptual Floorplan Simulation */}
      <div className="rounded-2xl bg-[#090e1a] border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>Interactive Mission Simulator</span>
            </div>
            <h3 className="text-xl font-bold text-white">Autonomous Environmental Sweep Simulation</h3>
            <p className="text-xs text-slate-400 mt-1">
              Test how the combined rover movement and gas reading telemetry creates an environmental hazard map.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                isPlaying 
                  ? 'bg-amber-500 text-black hover:bg-amber-400' 
                  : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Sweep' : 'Simulate Sweep'}</span>
            </button>

            <button
              onClick={resetSimulation}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Reset Grid"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* 2D Grid Canvas */}
          <div className="lg:col-span-2 bg-[#060a12] p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="text-xs font-mono text-slate-500 uppercase mb-3 flex items-center justify-between w-full">
              <span>Facility Grid Coordinate Map (Sector 7B)</span>
              <span className="text-cyan-400">Position: [{roverPos.x}, {roverPos.y}]</span>
            </div>

            <div className="grid grid-cols-6 gap-2 w-full max-w-[420px] aspect-square">
              {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                const x = idx % gridSize;
                const y = Math.floor(idx / gridSize);
                const key = `${x},${y}`;
                const isRover = roverPos.x === x && roverPos.y === y;
                const isObstacle = obstacles.includes(key);
                const inspected = inspectedPoints[key];
                const isHazard = inspected?.alert;

                return (
                  <div
                    key={key}
                    className={`relative rounded-md flex flex-col items-center justify-center text-[10px] font-mono border transition-all ${
                      isRover
                        ? 'bg-cyan-500 text-black font-extrabold border-cyan-300 shadow-[0_0_12px_#06b6d4] z-10'
                        : isObstacle
                        ? 'bg-slate-800/90 text-slate-500 border-slate-700'
                        : isHazard
                        ? 'bg-rose-950/80 text-rose-300 border-rose-500/80 animate-pulse'
                        : inspected
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/60'
                        : 'bg-slate-900/60 text-slate-600 border-slate-800/60'
                    }`}
                  >
                    {isRover ? (
                      <span className="text-[11px] font-bold">ROV</span>
                    ) : isObstacle ? (
                      <span className="text-[9px]">WALL</span>
                    ) : isHazard ? (
                      <span className="text-[9px] font-bold text-rose-300">ALERT</span>
                    ) : inspected ? (
                      <span className="text-[9px]">{inspected.gas}</span>
                    ) : (
                      <span className="opacity-25">{x},{y}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-cyan-500"></span>
                <span>Rover Position</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
                <span>Obstacle (Ultrasonic Echo)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-800"></span>
                <span>Inspected (Normal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-950 border border-rose-600"></span>
                <span>Anomaly Flagged</span>
              </div>
            </div>
          </div>

          {/* Simulation Telemetry Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase">Sector Coverage</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {Object.keys(inspectedPoints).length} / {gridSize * gridSize - obstacles.length} Nodes
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${(Object.keys(inspectedPoints).length / (gridSize * gridSize - obstacles.length)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase">Anomalies Detected</div>
              <div className={`text-2xl font-bold font-mono mt-1 ${
                anomaliesFound > 0 ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {anomaliesFound > 0 ? `${anomaliesFound} Hotspot Detected` : 'Zero Anomalies'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {anomaliesFound > 0 
                  ? 'Elevated ADC reading at [4,4] flagged for safety inspection.'
                  : 'All sampled grid points within standard atmospheric limits.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200">
              <span className="font-bold">Exhibition Takeaway: </span>
              In a real facility (e.g. chemistry lab, mine shaft, factory floor), this combined system allows humans to inspect volatile spaces remotely without exposure risks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
