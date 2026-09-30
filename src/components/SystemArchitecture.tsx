/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  Compass, 
  Wind, 
  Layers, 
  ArrowDown, 
  Zap, 
  Workflow, 
  AlertCircle,
  CheckCircle2,
  Share2,
  Radio
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'pinouts' | 'power'>('diagram');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Hardware & System Topography</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">System Architecture</h2>
          <p className="text-slate-400 text-sm mt-1">
            Technical blueprint comparing the current two-module exhibition setup against the unified future roadmap.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#0b111e] p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'diagram' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            System Diagram
          </button>
          <button
            onClick={() => setActiveTab('pinouts')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'pinouts' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            GPIO Pinout Table
          </button>
          <button
            onClick={() => setActiveTab('power')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'power' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Power Architecture
          </button>
        </div>
      </div>

      {activeTab === 'diagram' && (
        <div className="space-y-10">
          {/* Main Visual Architecture Card */}
          <div className="rounded-2xl bg-[#090e1a] border border-slate-800 p-6 sm:p-10 tech-grid-bg relative overflow-hidden">
            {/* Header label */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 border border-slate-700/80 px-3 py-1 rounded-full bg-slate-900">
                CURRENT EXHIBITION CONFIGURATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                Two Independent ESP32 Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Both systems are independently operational and are demonstrated as complementary modules.
              </p>
            </div>

            {/* Architecture Split Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-stretch">
              {/* Box 1: ROVER ESP32 */}
              <div className="rounded-xl bg-[#0d1424] border-2 border-cyan-500/50 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.12)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">MICROCONTROLLER A</span>
                        <h4 className="text-xl font-bold text-white">ROVER ESP32</h4>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Mobility Layer
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Autonomous navigation host controller responsible for motion physics, ultrasonic time-of-flight obstacle sensing, and servo sweeping.
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        DC Motors & H-Bridge
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">4x Geared TT Motors (L298N)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        Ultrasonic Sensor
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">HC-SR04 Proximity Echo</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        Micro Servo Mount
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">SG90 180° Sweep Actuator</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        Autonomous Navigation
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">Dynamic Avoidance Algorithm</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Power: 7.4V Li-ion Pack (Independent)</span>
                  <span className="text-cyan-400">ESP32-WROOM-32D</span>
                </div>
              </div>

              {/* Central Independent Divider */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#050810] border-2 border-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center text-sm shadow-xl">
                  +
                </div>
                <div className="bg-[#050810] border border-amber-500/40 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono mt-2 whitespace-nowrap">
                  SEPARATE HARDWARE
                </div>
              </div>

              {/* Box 2: E-NOSE ESP32 */}
              <div className="rounded-xl bg-[#0d1424] border-2 border-emerald-500/50 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.12)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <Wind className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">MICROCONTROLLER B</span>
                        <h4 className="text-xl font-bold text-white">E-NOSE ESP32</h4>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Sensing Layer
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Dedicated environmental telemetry station sampling analog chemical resistance changes alongside calibrated temperature and relative humidity.
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        MQ Gas Sensor Bank
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">3x Analog Resistive Sensors</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        DHT11 Climate Sensor
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">Temp (°C) + Humidity (%RH)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Gas Detection Preheating
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">Ceramic Heater Thermal Cycle</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Environment Data Logging
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px]">Multi-ADC Telemetry Stream</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Power: 5V 2A Regulated Rail</span>
                  <span className="text-emerald-400">ESP32-WROOM-32D</span>
                </div>
              </div>
            </div>

            {/* Explanatory Caption */}
            <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="text-white font-semibold">Exhibition Notice: </span>
                Currently, both ESP32 controllers run their own firmware sketches independently. No physical communication link (I2C / UART / wireless) currently binds them. They are exhibited together on the same demonstration chassis.
              </div>
            </div>
          </div>

          {/* Faded / Secondary Section: FUTURE INTEGRATION */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0b101c]/60 to-[#070b14]/90 border border-dashed border-slate-700/80 p-6 sm:p-10 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-700/60 font-mono text-xs uppercase font-bold tracking-wider">
                ROADMAP • FUTURE DEVELOPMENT
              </span>
              <span className="text-xs font-mono text-slate-400">Unified Environmental Inspection Platform</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-200">
              Future Integration Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              In subsequent phases of the project, both ESP32 microcontrollers will be bridged into a unified pipeline. The rover will geotag sensor readings across physical coordinates and stream telemetry directly to a single unified base station dashboard.
            </p>

            <div className="mt-8 p-6 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 opacity-90">
              <div className="text-center p-4 rounded-lg bg-cyan-950/30 border border-cyan-800/40 flex-1">
                <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-1">NODE A</div>
                <div className="text-base font-bold text-white">ROVER ESP32</div>
                <div className="text-[11px] text-slate-400 mt-1">Spatial coordinates & waypoint steering</div>
              </div>

              <div className="flex flex-col items-center text-slate-500 font-mono text-xs">
                <div className="px-3 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ESP-NOW / I2C Bus Link
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Future Inter-chip Bridge</span>
              </div>

              <div className="text-center p-4 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex-1">
                <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-1">NODE B</div>
                <div className="text-base font-bold text-white">E-NOSE ESP32</div>
                <div className="text-[11px] text-slate-400 mt-1">Gas plume detection & climate profiling</div>
              </div>

              <div className="text-slate-500 font-mono text-xl">
                ↓
              </div>

              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-cyan-950/50 to-emerald-950/50 border border-cyan-500/50 flex-1">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                  UNIFIED TARGET
                </div>
                <div className="text-base font-bold text-white">Autonomous Gas Inspection Platform</div>
                <div className="text-[11px] text-slate-400 mt-1">Auto-hazard zone mapping</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pinouts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rover Pinout Table */}
            <div className="rounded-xl bg-[#0b111e] border border-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/20">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-cyan-400" />
                  ROVER ESP32 Pin Allocation
                </h4>
                <span className="text-xs font-mono text-cyan-400">Node A</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2">Component</th>
                      <th className="py-2">Pin Name</th>
                      <th className="py-2">ESP32 GPIO</th>
                      <th className="py-2">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2 font-semibold text-white">HC-SR04</td>
                      <td className="py-2 text-cyan-400">Trig</td>
                      <td className="py-2">GPIO 5</td>
                      <td className="py-2 text-slate-400">10µs trigger pulse out</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">HC-SR04</td>
                      <td className="py-2 text-cyan-400">Echo</td>
                      <td className="py-2">GPIO 18</td>
                      <td className="py-2 text-slate-400">Pulse width distance return</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">SG90 Servo</td>
                      <td className="py-2 text-cyan-400">PWM Signal</td>
                      <td className="py-2">GPIO 19</td>
                      <td className="py-2 text-slate-400">50Hz PWM angle servo scan</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">L298N In1/In2</td>
                      <td className="py-2 text-cyan-400">IN1, IN2</td>
                      <td className="py-2">GPIO 26, 27</td>
                      <td className="py-2 text-slate-400">Left motor bank direction</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">L298N In3/In4</td>
                      <td className="py-2 text-cyan-400">IN3, IN4</td>
                      <td className="py-2">GPIO 14, 12</td>
                      <td className="py-2 text-slate-400">Right motor bank direction</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">L298N ENA/ENB</td>
                      <td className="py-2 text-cyan-400">ENA, ENB</td>
                      <td className="py-2">GPIO 25, 33</td>
                      <td className="py-2 text-slate-400">LEDC hardware PWM speed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* E-Nose Pinout Table */}
            <div className="rounded-xl bg-[#0b111e] border border-emerald-500/30 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-400" />
                  E-NOSE ESP32 Pin Allocation
                </h4>
                <span className="text-xs font-mono text-emerald-400">Node B</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2">Component</th>
                      <th className="py-2">Pin Name</th>
                      <th className="py-2">ESP32 GPIO</th>
                      <th className="py-2">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2 font-semibold text-white">DHT11</td>
                      <td className="py-2 text-emerald-400">DATA</td>
                      <td className="py-2">GPIO 4</td>
                      <td className="py-2 text-slate-400">Single-wire bidirectional clocking</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">MQ Sensor 1</td>
                      <td className="py-2 text-emerald-400">AOUT</td>
                      <td className="py-2">GPIO 34 (ADC1_CH6)</td>
                      <td className="py-2 text-slate-400">12-bit analog input (0-4095)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">MQ Sensor 2</td>
                      <td className="py-2 text-emerald-400">AOUT</td>
                      <td className="py-2">GPIO 35 (ADC1_CH7)</td>
                      <td className="py-2 text-slate-400">12-bit analog input (0-4095)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">MQ Sensor 3</td>
                      <td className="py-2 text-emerald-400">AOUT</td>
                      <td className="py-2">GPIO 32 (ADC1_CH4)</td>
                      <td className="py-2 text-slate-400">12-bit analog input (0-4095)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-white">Heater Rail</td>
                      <td className="py-2 text-emerald-400">VCC (Heater)</td>
                      <td className="py-2">5V Rail (External)</td>
                      <td className="py-2 text-slate-400">Steady 5.0V for ceramic internal coil</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'power' && (
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 space-y-6">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Power Distribution & Grounding Strategy
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Because electric DC motors generate heavy electromagnetic inductive spikes (back-EMF), and MQ sensor ceramic coils draw high current (~150mA each for internal heating), isolation of power domains is vital for system stability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase">Rover Power Circuit</div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Power Source: 7.4V (2S 18650 Li-ion battery pack)</li>
                <li>L298N VMS input: Direct 7.4V to power 4x DC motors</li>
                <li>ESP32 VIN: Regulated 5V via step-down buck converter (LM2596)</li>
                <li>Shared common ground between battery, driver, and ESP32</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase">E-Nose Power Circuit</div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Power Source: Dedicated 5V 2.0A regulated power bank</li>
                <li>MQ Sensor internal heaters require continuous 5V 150mA each</li>
                <li>ESP32 3.3V reference isolated from motor high-frequency switching noise</li>
                <li>Clean analog ground prevents ADC jitter on sensor readings</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
