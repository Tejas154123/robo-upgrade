/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Wifi, 
  WifiOff, 
  Terminal, 
  RefreshCw, 
  Sliders, 
  HelpCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { telemetryStore } from '../services/telemetryStore';
import { RoverData, ENoseData } from '../types/telemetry';

interface ConnectionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  roverData: RoverData;
  eNoseData: ENoseData;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const ConnectionSettingsModal: React.FC<ConnectionSettingsModalProps> = ({
  isOpen,
  onClose,
  roverData,
  eNoseData,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const [roverIp, setRoverIp] = useState(telemetryStore.endpoints.roverIp);
  const [eNoseIp, setENoseIp] = useState(telemetryStore.endpoints.eNoseIp);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSaveEndpoints = () => {
    telemetryStore.endpoints.roverIp = roverIp.trim();
    telemetryStore.endpoints.eNoseIp = eNoseIp.trim();
    setPingStatus('Endpoint addresses updated.');
  };

  const handleTestRover = async () => {
    setIsTesting(true);
    setPingStatus('Attempting HTTP fetch to Rover ESP32...');
    const res = await telemetryStore.testConnectRover(roverIp.trim());
    setPingStatus(res.message);
    setIsTesting(false);
  };

  const handleTestENose = async () => {
    setIsTesting(true);
    setPingStatus('Attempting HTTP fetch to E-Nose ESP32...');
    const res = await telemetryStore.testConnectENose(eNoseIp.trim());
    setPingStatus(res.message);
    setIsTesting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b111e] border-2 border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">ESP32 Hardware Bridge Setup</h3>
              <p className="text-xs text-slate-400">Configure Wi-Fi IP endpoints for real hardware connection.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Hardware Rule Reminder */}
        <div className="p-3.5 rounded-lg bg-slate-900 border border-amber-500/40 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Zero-Falsification Policy: </strong>
            This dashboard does not fake connectivity. Clicking &quot;Connect&quot; will make a real HTTP request to your local network. If the boards are not powered on the same Wi-Fi SSID, the system honestly remains disconnected.
          </div>
        </div>

        {/* Demo Mode Toggle Switch */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-white font-bold uppercase">
              Demonstration Mode Simulator
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Simulates realistic ultrasonic radar sweeps & sensor fluctuations for exhibition booth displays.
            </div>
          </div>

          <button
            onClick={onToggleDemoMode}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
              isDemoMode
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {isDemoMode ? 'SIMULATION ON' : 'SIMULATION OFF'}
          </button>
        </div>

        {/* Rover IP Configuration */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-cyan-400 uppercase font-semibold flex items-center justify-between">
            <span>Rover ESP32 IP Address / Hostname</span>
            <span className="text-[10px] text-slate-400">Port 80</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={roverIp}
              onChange={(e) => setRoverIp(e.target.value)}
              placeholder="e.g. 192.168.4.1 or rover.local"
              className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleTestRover}
              disabled={isTesting}
              className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-colors disabled:opacity-50"
            >
              Test Ping
            </button>
          </div>
        </div>

        {/* E-Nose IP Configuration */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center justify-between">
            <span>E-Nose ESP32 IP Address / Hostname</span>
            <span className="text-[10px] text-slate-400">Port 80</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={eNoseIp}
              onChange={(e) => setENoseIp(e.target.value)}
              placeholder="e.g. 192.168.4.2 or enose.local"
              className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={handleTestENose}
              disabled={isTesting}
              className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold transition-colors disabled:opacity-50"
            >
              Test Ping
            </button>
          </div>
        </div>

        {/* Feedback Log */}
        {pingStatus && (
          <div className="p-3 rounded-lg bg-black/70 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{pingStatus}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              handleSaveEndpoints();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black text-xs font-mono font-bold uppercase transition-all shadow-md"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
