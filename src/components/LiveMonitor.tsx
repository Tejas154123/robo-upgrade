/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  Compass, 
  Wind, 
  AlertTriangle, 
  Radio, 
  RotateCw, 
  Settings, 
  Terminal, 
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { RoverData, ENoseData } from '../types/telemetry';
import { telemetryStore } from '../services/telemetryStore';

interface LiveMonitorProps {
  roverData: RoverData;
  eNoseData: ENoseData;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onOpenSettings: () => void;
}

export const LiveMonitor: React.FC<LiveMonitorProps> = ({
  roverData,
  eNoseData,
  isDemoMode,
  onToggleDemoMode,
  onOpenSettings,
}) => {
  const [activeJsonTab, setActiveJsonTab] = useState<'rover' | 'enose'>('rover');
  const [testingRover, setTestingRover] = useState(false);
  const [testingENose, setTestingENose] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handlePingRover = async () => {
    setTestingRover(true);
    setTestResult(null);
    const res = await telemetryStore.testConnectRover(telemetryStore.endpoints.roverIp);
    setTestResult(res.message);
    setTestingRover(false);
  };

  const handlePingENose = async () => {
    setTestingENose(true);
    setTestResult(null);
    const res = await telemetryStore.testConnectENose(telemetryStore.endpoints.eNoseIp);
    setTestResult(res.message);
    setTestingENose(false);
  };

  return (
    <div className="space-y-8">
      {/* Central Exhibition Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Exhibition Central Console</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Dual-Station Live Monitor</h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time command and telemetry status across both independent physical hardware nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDemoMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 border transition-all ${
              isDemoMode 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 hover:bg-cyan-900/60' 
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulation: <strong>{isDemoMode ? 'ON' : 'OFF'}</strong></span>
          </button>

          <button
            onClick={onOpenSettings}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-2"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Endpoints</span>
          </button>
        </div>
      </div>

      {/* Prominent Required Exhibition Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-950/60 via-[#0d1424] to-emerald-950/60 border-2 border-slate-700 p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full">
            SYSTEM DISCLOSURE & DEMONSTRATION MODE
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            “Two independent systems — future integration possible.”
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            This monitoring console is currently operating in <strong>demonstration interface mode</strong>. Both ESP32 modules have separate telemetry channels and can be upgraded to live Wi-Fi streaming using HTTP or WebSockets.
          </p>
        </div>
      </div>

      {/* TWO CLEARLY SEPARATED PANELS SIDE BY SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* PANEL 1: ROVER */}
        <div className="rounded-xl bg-[#0b111e] border-2 border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <div>
            {/* Panel 1 Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">HARDWARE UNIT 01</span>
                  <h4 className="text-xl font-bold text-white">ROVER MODULE</h4>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Chassis Node
              </span>
            </div>

            {/* Connection & Status Rows (REQUIRED SPEC) */}
            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-semibold">CONNECTION:</span>
                {roverData.connected ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ONLINE ({roverData.ipAddress})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-400 font-bold bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/50">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    NOT CONNECTED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-semibold">STATUS:</span>
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  {roverData.connected ? 'HARDWARE ACTIVE' : 'DEMO MODE'}
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Indicators */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Obstacle Clearance</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {roverData.distance !== null ? `${roverData.distance} cm` : '--'}
                </div>
                <div className="text-[10px] font-mono text-cyan-400 mt-1">
                  {roverData.obstacleDetected ? '⚠️ Avoidance Triggered' : '✓ Corridor Clear'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Motion Vector</div>
                <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                  {roverData.movement}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Servo @ {roverData.servoAngle}°
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 font-mono">
              <div className="text-[10px] text-slate-500 uppercase mb-1">Rover Controller Status:</div>
              <div>{roverData.statusMessage}</div>
            </div>
          </div>

          {/* Test Ping Button */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Target: {telemetryStore.endpoints.roverIp}</span>
            <button
              onClick={handlePingRover}
              disabled={testingRover}
              className="px-3 py-1.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingRover ? 'animate-spin' : ''}`} />
              <span>{testingRover ? 'Testing Wi-Fi...' : 'Test Hardware Ping'}</span>
            </button>
          </div>
        </div>

        {/* PANEL 2: E-NOSE */}
        <div className="rounded-xl bg-[#0b111e] border-2 border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <div>
            {/* Panel 2 Header */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">HARDWARE UNIT 02</span>
                  <h4 className="text-xl font-bold text-white">E-NOSE MODULE</h4>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Sensing Node
              </span>
            </div>

            {/* Connection & Status Rows (REQUIRED SPEC) */}
            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-semibold">CONNECTION:</span>
                {eNoseData.connected ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ONLINE ({eNoseData.ipAddress})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-400 font-bold bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/50">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    NOT CONNECTED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase font-semibold">STATUS:</span>
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/50">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  {eNoseData.connected ? 'HARDWARE ACTIVE' : 'DEMO MODE'}
                </span>
              </div>
            </div>

            {/* Quick Live Telemetry Indicators */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Ambient Climate</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  {eNoseData.temperature !== null ? `${eNoseData.temperature}°C` : '--'} / {eNoseData.humidity !== null ? `${eNoseData.humidity}%` : '--'}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">
                  DHT11 Stream Active
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">MQ Array Channels</div>
                <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                  3 Channels
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  Avg ADC: {eNoseData.mqSensors[0]?.rawAdc ?? '--'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 font-mono">
              <div className="text-[10px] text-slate-500 uppercase mb-1">E-Nose Controller Status:</div>
              <div>{eNoseData.statusMessage}</div>
            </div>
          </div>

          {/* Test Ping Button */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Target: {telemetryStore.endpoints.eNoseIp}</span>
            <button
              onClick={handlePingENose}
              disabled={testingENose}
              className="px-3 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingENose ? 'animate-spin' : ''}`} />
              <span>{testingENose ? 'Testing Wi-Fi...' : 'Test Hardware Ping'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ping Feedback Alert */}
      {testResult && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>{testResult}</span>
        </div>
      )}

      {/* Raw JSON Data Layer Inspector for Student Developers */}
      <div className="rounded-xl bg-[#090e1a] border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-4 gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Developer Data Layer Inspector
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              This demonstrates the exact JSON object schema designed to receive physical ESP32 data.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveJsonTab('rover')}
              className={`px-3 py-1 rounded transition-colors ${
                activeJsonTab === 'rover' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              roverData
            </button>
            <button
              onClick={() => setActiveJsonTab('enose')}
              className={`px-3 py-1 rounded transition-colors ${
                activeJsonTab === 'enose' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              eNoseData
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-lg bg-black/70 border border-slate-800/80 font-mono text-xs text-emerald-400/90 overflow-x-auto max-h-64">
          {JSON.stringify(activeJsonTab === 'rover' ? roverData : eNoseData, null, 2)}
        </pre>
      </div>
    </div>
  );
};
