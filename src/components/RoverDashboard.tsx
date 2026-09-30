/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  AlertTriangle, 
  Radio, 
  RotateCw, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Zap, 
  Sliders,
  CheckCircle,
  HelpCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { RoverData } from '../types/telemetry';

interface RoverDashboardProps {
  roverData: RoverData;
  isDemoMode: boolean;
  onOpenSettings: () => void;
}

export const RoverDashboard: React.FC<RoverDashboardProps> = ({
  roverData,
  isDemoMode,
  onOpenSettings,
}) => {
  const distance = roverData.distance;
  const isClose = distance !== null && distance < 20;
  const isWarning = distance !== null && distance >= 20 && distance < 35;
  const servoAngle = roverData.servoAngle ?? 90;

  return (
    <div className="space-y-8">
      {/* Disclaimer / Hardware Status Banner */}
      {!roverData.connected ? (
        <div className="rounded-xl bg-amber-950/40 border-2 border-amber-500/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide flex items-center gap-2">
                <span>DEMO DATA — HARDWARE NOT CONNECTED</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200">
                  SIMULATION ACTIVE
                </span>
              </div>
              <div className="text-xs text-amber-400/80">
                The values shown below illustrate the autonomous obstacle avoidance telemetry. The Rover ESP32 is currently offline.
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
                Receiving active telemetry from Rover ESP32 at {roverData.ipAddress}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Autonomous Rover Subsystem</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Rover Telemetry & Navigation</h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time ultrasonic range finding, servo sweep orientation, and 4WD motor actuation.
          </p>
        </div>

        {/* Rover Mode Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Operating Mode</div>
            <div className="text-base font-bold font-mono text-cyan-400">
              {roverData.mode}
            </div>
          </div>
          <div className="h-10 w-px bg-slate-800"></div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Movement Vector</div>
            <div className={`text-base font-bold font-mono ${
              roverData.movement === 'OBSTACLE_AVOIDING' ? 'text-amber-400 animate-pulse' :
              roverData.movement === 'FORWARD' ? 'text-emerald-400' : 'text-cyan-300'
            }`}>
              {roverData.movement}
            </div>
          </div>
        </div>
      </div>

      {/* Role explanation block */}
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200/90 leading-relaxed flex items-center gap-3">
        <Activity className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>
          <strong>Functional Responsibility: </strong>
          “The rover provides the mobility and autonomous navigation layer of the system.” It traverses designated inspection sectors, continuously monitors front clearance using soundwave echo, and pivots automatically away from walls or obstacles.
        </span>
      </div>

      {/* Primary Rover Telemetry Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Ultrasonic Radar & Distance Gauge */}
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4" /> Ultrasonic Radar
              </span>
              <span className="text-[10px] font-mono text-slate-400">HC-SR04</span>
            </div>

            {/* Simulated Radar Visual */}
            <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center my-4">
              {/* Radar rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20"></div>
              <div className="absolute inset-4 rounded-full border border-cyan-500/20"></div>
              <div className="absolute inset-8 rounded-full border border-cyan-500/25"></div>
              <div className="absolute inset-16 rounded-full border border-cyan-500/30"></div>
              <div className="absolute inset-24 rounded-full border border-cyan-500/40"></div>
              
              {/* Axis crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/20"></div>
              <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/20"></div>

              {/* Servo sweep beam */}
              <div 
                className="absolute w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300 origin-left left-1/2 top-1/2 transition-transform duration-300 pointer-events-none"
                style={{
                  transform: `rotate(${servoAngle - 90}deg)`,
                  boxShadow: '0 0 10px #06b6d4',
                }}
              ></div>

              {/* Detected obstacle blip */}
              {distance !== null && (
                <div 
                  className={`absolute w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    isClose ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-ping' :
                    isWarning ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' :
                    'bg-emerald-400 shadow-[0_0_10px_#10b981]'
                  }`}
                  style={{
                    transform: `rotate(${servoAngle - 90}deg) translate(${Math.min(90, Math.max(20, distance * 1.5))}px, 0)`,
                  }}
                ></div>
              )}

              {/* Center Rover Chassis Icon */}
              <div className="relative z-10 w-8 h-8 rounded bg-slate-900 border border-cyan-500/60 flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
                ROV
              </div>
            </div>

            {/* Distance Readout */}
            <div className="text-center mt-2">
              <div className="text-xs font-mono text-slate-400 uppercase">Clearance to Nearest Object</div>
              <div className={`text-4xl font-extrabold font-mono mt-1 ${
                isClose ? 'text-rose-400' :
                isWarning ? 'text-amber-400' :
                'text-emerald-400'
              }`}>
                {distance !== null ? `${distance} cm` : '--'}
              </div>
              <div className="text-xs mt-1 font-mono">
                {isClose ? (
                  <span className="text-rose-400 font-bold">⚠️ CRITICAL: OBSTACLE PROXIMITY</span>
                ) : isWarning ? (
                  <span className="text-amber-400 font-medium">⚠️ CAUTION: DECELERATION ZONE</span>
                ) : (
                  <span className="text-emerald-400 font-medium">✓ PATH CLEAR (&gt;35cm)</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Range: 2cm - 400cm</span>
            <span>Angle: {servoAngle}°</span>
          </div>
        </div>

        {/* Center Column: Servo & Motor Control Status */}
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <RotateCw className="w-4 h-4" /> Servo Sweep & Steering
              </span>
              <span className="text-[10px] font-mono text-slate-400">SG90 Micro Servo</span>
            </div>

            {/* Servo Angle Dial */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-center mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase">Sensor Mount Angle</div>
              <div className="text-3xl font-bold font-mono text-cyan-300 mt-1">{servoAngle}°</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${(servoAngle / 180) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>0° (Left)</span>
                <span>90° (Center)</span>
                <span>180° (Right)</span>
              </div>
            </div>

            {/* Motor Drive Status */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>4WD Motor H-Bridge Status</span>
                <span className="text-[10px] text-cyan-400 font-mono">L298N Dual Channel</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Left Bank */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Left Bank (M1+M2)</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {roverData.motors.leftSpeed} <span className="text-xs text-slate-500 font-normal">/ 255</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">
                    Dir: {roverData.motors.leftDirection}
                  </div>
                </div>

                {/* Right Bank */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Right Bank (M3+M4)</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {roverData.motors.rightSpeed} <span className="text-xs text-slate-500 font-normal">/ 255</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">
                    Dir: {roverData.motors.rightDirection}
                  </div>
                </div>
              </div>

              {/* Movement indicator bar */}
              <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current Action:</span>
                <span className="text-cyan-300 font-semibold">{roverData.statusMessage}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Motor Driver: L298N 2A Dual H-Bridge</span>
            <span>Speed: PWM Controlled</span>
          </div>
        </div>

        {/* Right Column: Physical Chassis Components */}
        <div className="rounded-xl bg-[#0b111e] border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Hardware Bill of Materials
              </span>
              <span className="text-[10px] font-mono text-slate-400">Rover Node</span>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <div className="font-semibold text-white">ESP32 DevKit V1 (30 Pin)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Dual Tensilica LX6 cores @ 240MHz, hardware PWM timers for motor control.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <div className="font-semibold text-white">4x DC Gear Motors (TT Style)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">1:48 gear ratio, 6V operating voltage, rubber high-grip all-terrain wheels.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <div className="font-semibold text-white">L298N Dual H-Bridge Driver</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Supports bidirectional motor driving up to 2A per channel with optical isolation.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <div className="font-semibold text-white">HC-SR04 Ultrasonic + SG90 Servo</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Mounted on a rotating pan bracket to sweep forward and side angles before turning.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <div className="font-semibold text-white">Power System</div>
                <div className="text-slate-400 text-[11px] mt-0.5">2x 18650 Li-ion cells in series (~7.4V nominal) with step-down regulator.</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Battery: {roverData.batteryVoltage ? `${roverData.batteryVoltage}V` : '7.4V Nom'}</span>
            <span className="text-emerald-400">Power OK</span>
          </div>
        </div>
      </div>

      {/* Obstacle Avoidance State Machine Diagram */}
      <div className="p-6 rounded-xl bg-[#090e1a] border border-slate-800">
        <h4 className="text-sm font-bold font-mono uppercase text-cyan-400 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Autonomous Obstacle Avoidance Logic Flow
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="font-mono text-cyan-400 font-bold">STATE 01: FORWARD PATROL</div>
            <p className="text-slate-400 mt-1">
              Both motor banks drive forward at 180 PWM. Ultrasonic sensor looks forward at 90°.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="font-mono text-amber-400 font-bold">STATE 02: PROXIMITY TRIP</div>
            <p className="text-slate-400 mt-1">
              Echo returns distance &lt; 20 cm. Motors brake immediately to prevent physical collision.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="font-mono text-purple-400 font-bold">STATE 03: SERVO SCAN</div>
            <p className="text-slate-400 mt-1">
              SG90 turns ultrasonic mount left (30°) and right (150°) to calculate widest escape corridor.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <div className="font-mono text-emerald-400 font-bold">STATE 04: PIVOT & RESUME</div>
            <p className="text-slate-400 mt-1">
              Differential spin turn executes toward open direction. Servo recenters and rover continues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
