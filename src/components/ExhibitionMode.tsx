/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Minimize2, 
  Compass, 
  Wind, 
  Cpu, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { RoverData, ENoseData } from '../types/telemetry';

interface ExhibitionModeProps {
  onExit: () => void;
  roverData: RoverData;
  eNoseData: ENoseData;
}

export const ExhibitionMode: React.FC<ExhibitionModeProps> = ({
  onExit,
  roverData,
  eNoseData,
}) => {
  const [pulseStep, setPulseStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPulseStep((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04070d] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none tech-grid-bg overflow-y-auto">
      {/* Top Bar for Booth Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-sm font-mono tracking-widest uppercase text-cyan-400 font-semibold">
            ROBOTICS & AI EXHIBITION • OCTOBER 2026
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Close Kiosk View</span>
          </button>
        </div>
      </div>

      {/* Main Exhibition Core: Huge Title & Subtitle */}
      <div className="text-center my-6 space-y-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          SMART ENVIRONMENTAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
            INSPECTION ROVER
          </span>
        </h1>
        <p className="text-lg sm:text-2xl text-slate-300 font-light tracking-wide">
          “Autonomous mobility + environmental sensing”
        </p>
      </div>

      {/* Dual Pillars: Rover & E-Nose (Readable from several feet away) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full my-4">
        {/* Column 1: ROVER */}
        <div className="rounded-2xl bg-[#0b1220] border-2 border-cyan-500/50 p-8 sm:p-10 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Compass className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-semibold">
                  SUBSYSTEM A
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">ROVER</h2>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-wide font-mono mt-4">
              AUTONOMOUS NAVIGATION
            </div>

            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              • 4-wheel drive motor chassis<br />
              • Ultrasonic obstacle detection<br />
              • Servo-mounted radar scanning<br />
              • Collision-avoidance state machine
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>ESP32 CONTROLLER #1</span>
            <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800">
              {roverData.connected ? 'HARDWARE ONLINE' : 'DEMO MODE'}
            </span>
          </div>
        </div>

        {/* Column 2: E-NOSE */}
        <div className="rounded-2xl bg-[#0b1220] border-2 border-emerald-500/50 p-8 sm:p-10 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Wind className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-semibold">
                  SUBSYSTEM B
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">E-NOSE</h2>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-wide font-mono mt-4">
              ENVIRONMENTAL SENSING
            </div>

            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              • MQ-series gas sensor cluster<br />
              • DHT11 temperature & humidity<br />
              • Continuous analog ADC logging<br />
              • Independent environmental monitoring
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>ESP32 CONTROLLER #2</span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800">
              {eNoseData.connected ? 'HARDWARE ONLINE' : 'DEMO MODE'}
            </span>
          </div>
        </div>
      </div>

      {/* Required Exhibition Status Banners: Current Setup vs Future Goal */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Banner 1: CURRENT SETUP */}
        <div className="rounded-xl bg-[#0e1628] border-2 border-amber-500/60 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
            <span className="font-mono text-xl font-bold">2</span>
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase font-bold tracking-widest">
              CURRENT SETUP
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              2 INDEPENDENT ESP32 SYSTEMS
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Demonstrated together as complementary proof-of-concept hardware modules.
            </div>
          </div>
        </div>

        {/* Banner 2: FUTURE GOAL */}
        <div className="rounded-xl bg-[#0e1628] border-2 border-purple-500/60 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-purple-400 uppercase font-bold tracking-widest">
              FUTURE GOAL
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              UNIFIED ENVIRONMENTAL INSPECTION PLATFORM
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Single integrated autonomous vehicle with wireless inter-chip data bridging.
            </div>
          </div>
        </div>
      </div>

      {/* Simple Animated System Flow Diagram */}
      <div className="max-w-5xl mx-auto w-full py-4">
        <div className="text-center mb-3 text-xs font-mono text-slate-400 uppercase tracking-widest">
          Animated System Telemetry Flow
        </div>

        <div className="flex items-center justify-between gap-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className={`p-3 rounded-lg border text-center flex-1 transition-all ${
            pulseStep === 0 ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_15px_#06b6d4]' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="text-xs font-mono text-cyan-400 font-bold">1. ROVER PATROL</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Autonomous Mobility</div>
          </div>

          <div className="text-slate-600 font-mono">→</div>

          <div className={`p-3 rounded-lg border text-center flex-1 transition-all ${
            pulseStep === 1 ? 'bg-cyan-500/30 border-cyan-400 shadow-[0_0_15px_#06b6d4]' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="text-xs font-mono text-cyan-400 font-bold">2. OBSTACLE AVOID</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Ultrasonic Radar Sweep</div>
          </div>

          <div className="text-slate-600 font-mono">→</div>

          <div className={`p-3 rounded-lg border text-center flex-1 transition-all ${
            pulseStep === 2 ? 'bg-emerald-500/30 border-emerald-400 shadow-[0_0_15px_#10b981]' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="text-xs font-mono text-emerald-400 font-bold">3. E-NOSE SENSE</div>
            <div className="text-[11px] text-slate-300 mt-0.5">MQ + DHT11 Sampling</div>
          </div>

          <div className="text-slate-600 font-mono">→</div>

          <div className={`p-3 rounded-lg border text-center flex-1 transition-all ${
            pulseStep === 3 ? 'bg-purple-500/30 border-purple-400 shadow-[0_0_15px_#a855f7]' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="text-xs font-mono text-purple-400 font-bold">4. WEB DASHBOARD</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Unified Visualization</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Ribbon */}
      <div className="text-center pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
        Smart Environmental Inspection Rover • Student Robotics Project • Press ESC or click Close to return
      </div>
    </div>
  );
};
