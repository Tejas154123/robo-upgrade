/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Flame, 
  ShieldAlert, 
  Activity, 
  Clock, 
  AlertCircle,
  Wifi,
  Sparkles,
  Info
} from 'lucide-react';
import { ENoseData, MqSensorReading } from '../types/telemetry';

interface ENoseDashboardProps {
  eNoseData: ENoseData;
  isDemoMode: boolean;
  onOpenSettings: () => void;
}

export const ENoseDashboard: React.FC<ENoseDashboardProps> = ({
  eNoseData,
  isDemoMode,
  onOpenSettings,
}) => {
  const isPreheating = eNoseData.preheatElapsedSec < eNoseData.preheatRequiredSec;
  const preheatPercent = Math.min(100, Math.round((eNoseData.preheatElapsedSec / eNoseData.preheatRequiredSec) * 100));

  return (
    <div className="space-y-8">
      {/* Disclaimer / Hardware Status Banner */}
      {!eNoseData.connected ? (
        <div className="rounded-xl bg-amber-950/40 border-2 border-amber-500/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide flex items-center gap-2">
                <span>DEMO DATA — E-NOSE ESP32 NOT CONNECTED</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200">
                  SIMULATION ACTIVE
                </span>
              </div>
              <div className="text-xs text-amber-400/80">
                Displaying simulated environmental telemetry to demonstrate dashboard metrics. The E-Nose ESP32 is currently offline.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="whitespace-nowrap px-3 py-1.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-mono text-amber-200 transition-colors"
          >
            Configure Wi-Fi Endpoint →
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-emerald-950/40 border-2 border-emerald-500/50 p-4 flex items-center justify-between text-emerald-300">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-sm font-bold">LIVE HARDWARE CONNECTED</div>
              <div className="text-xs text-emerald-400/80">
                Receiving active telemetry from E-Nose ESP32 at {eNoseData.ipAddress}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
            <Wind className="w-3.5 h-3.5" />
            <span>Environmental Sensing Subsystem</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">E-Nose Gas & Climate Module</h2>
          <p className="text-slate-400 text-sm mt-1">
            Multi-channel analog chemical resistive sensor bank coupled with digital temperature & humidity telemetry.
          </p>
        </div>

        {/* Sensor Module Status */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Array Status</div>
            <div className={`text-base font-bold font-mono ${isPreheating ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isPreheating ? 'PREHEATING COILS' : 'THERMAL EQUILIBRIUM'}
            </div>
          </div>
        </div>
      </div>

      {/* Role explanation block */}
      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200/90 leading-relaxed flex items-center gap-3">
        <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong>Functional Responsibility: </strong>
          “The E-Nose is an independent environmental sensing module based on MQ-series sensors and DHT11.” It converts atmospheric gas concentration changes and thermodynamic climate factors into raw voltage signals for comparative inspection analysis.
        </span>
      </div>

      {/* DHT11 Climate Row: Temperature & Humidity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Card */}
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold">
              <Thermometer className="w-4 h-4" />
              <span>Ambient Temperature</span>
            </div>
            <div className="text-4xl font-extrabold font-mono text-white pt-2">
              {eNoseData.temperature !== null ? `${eNoseData.temperature} °C` : '--'}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              DHT11 Digital Sensor • {eNoseData.temperature !== null ? `${((eNoseData.temperature * 9/5) + 32).toFixed(1)} °F` : '--'}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Thermometer className="w-10 h-10" />
          </div>
        </div>

        {/* Humidity Card */}
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase font-bold">
              <Droplets className="w-4 h-4" />
              <span>Relative Humidity</span>
            </div>
            <div className="text-4xl font-extrabold font-mono text-white pt-2">
              {eNoseData.humidity !== null ? `${eNoseData.humidity} %` : '--'}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              DHT11 Digital Sensor • Range 20% - 90% RH
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Droplets className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* MQ Sensor Preheating Indicator */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <span>MQ Sensor Ceramic Heater Conditioning</span>
              <span className="text-[10px] text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded bg-amber-950/40">
                {preheatPercent}% Ready
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              MQ sensors utilize internal SnO2 semiconductor heaters requiring warm-up time to reach stable operating temperature (~300°C internally).
            </div>
          </div>
        </div>
        <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${preheatPercent}%` }}
          ></div>
        </div>
      </div>

      {/* MQ SENSOR ARRAY CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">MQ-Series Analog Gas Sensing Cluster</h3>
            <p className="text-xs text-slate-400">
              Generic analog voltage and resistance ratio telemetry. (No unverified gas identities claimed).
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded">
            ADC Resolution: 12-Bit (0-4095)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eNoseData.mqSensors.map((sensor) => (
            <div 
              key={sensor.id}
              className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {sensor.label}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500">{sensor.hardwareTag}</div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    sensor.status === 'READY' 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {sensor.status}
                  </span>
                </div>

                {/* Primary Raw ADC metric */}
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Raw Analog Value (ADC)</div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {sensor.rawAdc !== null ? sensor.rawAdc : '--'}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ 4095</span>
                  </div>
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">Analog Voltage</div>
                    <div className="text-sm font-bold text-cyan-300 mt-0.5">
                      {sensor.voltage !== null ? `${sensor.voltage} V` : '--'}
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase">Baseline Rs/R0</div>
                    <div className="text-sm font-bold text-emerald-300 mt-0.5">
                      {sensor.baselineRatio !== null ? `${sensor.baselineRatio}x` : '--'}
                    </div>
                  </div>
                </div>

                {/* Real-time SVG sparkline history */}
                <div className="mt-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1 flex items-center justify-between">
                    <span>Recent Trend (20 samples)</span>
                    <span className="text-emerald-400">Live Trace</span>
                  </div>
                  <div className="h-16 w-full bg-slate-900/80 rounded border border-slate-800 p-1 flex items-end">
                    {sensor.history && sensor.history.length > 1 ? (
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                        {/* Sparkline path */}
                        {(() => {
                          const min = Math.min(...sensor.history) * 0.9;
                          const max = Math.max(...sensor.history) * 1.1 || 1;
                          const range = max - min || 1;
                          const points = sensor.history.map((val, idx) => {
                            const x = (idx / (sensor.history.length - 1)) * 100;
                            const y = 38 - ((val - min) / range) * 35;
                            return `${x},${y}`;
                          }).join(' ');

                          return (
                            <>
                              <polyline
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={points}
                              />
                            </>
                          );
                        })()}
                      </svg>
                    ) : (
                      <div className="w-full text-center text-[10px] font-mono text-slate-600">
                        Awaiting data stream...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Sensor Type: Gas Sensitive SnO2</span>
                <span className="text-slate-400">3.3V Logic</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calibration & Science Disclosure Note */}
      <div className="p-5 rounded-xl bg-[#090e1a] border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="font-mono text-cyan-400 font-bold uppercase flex items-center gap-2">
          <Info className="w-4 h-4" />
          Technical Sensor Characterization Note
        </div>
        <p className="leading-relaxed">
          MQ-series sensors change their surface electrical resistance (Rs) when oxidising or reducing gases interact with heated tin dioxide (SnO2). Because laboratory gas calibration chambers are required to map precise parts-per-million (PPM) curves for specific chemicals, this exhibition dashboard displays <strong>standardized raw ADC voltages and relative baseline ratios (Rs/R0)</strong> to maintain strict scientific accuracy.
        </p>
      </div>
    </div>
  );
};
