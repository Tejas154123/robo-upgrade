/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  Wind, 
  Cpu, 
  ArrowRight, 
  ShieldAlert, 
  GitMerge, 
  CheckCircle2, 
  Radio, 
  Gauge, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { RoverData, ENoseData } from '../types/telemetry';

interface HomeOverviewProps {
  onNavigate: (tab: string) => void;
  roverData: RoverData;
  eNoseData: ENoseData;
  isDemoMode: boolean;
  onEnterExhibitionMode: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onNavigate,
  roverData,
  eNoseData,
  isDemoMode,
  onEnterExhibitionMode,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e1626] to-[#070b14] border border-slate-800/80 p-6 sm:p-10 lg:p-12 tech-grid-bg">
        {/* Subtle accent light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          {/* Exhibition Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>School Robotics & AI Exhibition • October 2026</span>
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            SMART ENVIRONMENTAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              INSPECTION ROVER
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xl sm:text-2xl text-slate-300 font-light tracking-wide">
            “Autonomous mobility + environmental sensing”
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            A modular robotics research and exhibition platform integrating autonomous terrain obstacle navigation
            with multi-channel gas and climate monitoring. Built using dual independent ESP32 embedded microcontrollers.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('architecture')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <span>EXPLORE SYSTEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('rover')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 transition-colors"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>ROVER MODULE</span>
            </button>

            <button
              onClick={() => onNavigate('enose')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-emerald-300 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 hover:border-emerald-400 transition-colors"
            >
              <Wind className="w-4 h-4 text-emerald-400" />
              <span>E-NOSE MODULE</span>
            </button>

            <button
              onClick={onEnterExhibitionMode}
              className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <span>BOOTH MODE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Visual Representation of the Concept */}
      <section className="rounded-2xl bg-[#0b111e] border border-slate-800 p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Concept Architecture</span>
          <h2 className="text-2xl font-bold text-white mt-1">Modular Inspection Workflow</h2>
          <p className="text-slate-400 text-sm mt-1">
            How the autonomous rover and chemical sensing modules combine conceptually into a unified solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
          {/* Step 1: Rover Module */}
          <div 
            onClick={() => onNavigate('rover')}
            className="cursor-pointer group p-6 rounded-xl bg-[#0e1628] border border-cyan-500/30 hover:border-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                MODULE 01
              </span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              ROVER MODULE
            </h3>
            <div className="text-cyan-400 font-mono text-sm mt-1 font-semibold flex items-center gap-1.5">
              <span>↓ Autonomous Navigation</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              ESP32-driven 4-wheel robotic chassis equipped with servo-actuated ultrasonic obstacle detection, differential drive motor control, and autonomous collision avoidance logic.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Status: {roverData.connected ? 'ONLINE' : 'DEMO MODE'}</span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Telemetry →
              </span>
            </div>
          </div>

          {/* Plus Sign */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-600">
            <div className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900/80 flex items-center justify-center text-cyan-400 font-mono text-lg font-bold">
              +
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-500 mt-2">Combined Concept</span>
          </div>

          {/* Step 2: E-Nose Module */}
          <div 
            onClick={() => onNavigate('enose')}
            className="cursor-pointer group p-6 rounded-xl bg-[#0e1628] border border-emerald-500/30 hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                MODULE 02
              </span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              E-NOSE MODULE
            </h3>
            <div className="text-emerald-400 font-mono text-sm mt-1 font-semibold flex items-center gap-1.5">
              <span>↓ Environmental Sensing</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Dedicated ESP32 host coupled with an analog MQ-series gas sensing cluster and DHT11 digital temperature & humidity sensor for continuous ambient climate and gas telemetry.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Status: {eNoseData.connected ? 'ONLINE' : 'DEMO MODE'}</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Telemetry →
              </span>
            </div>
          </div>
        </div>

        {/* Unified Inspection Concept Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Together: Environmental Inspection Concept</div>
              <div className="text-xs text-slate-400">
                A mobile sensing robot that scans hazardous, enclosed, or hard-to-reach industrial or laboratory environments.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('analysis')}
            className="whitespace-nowrap px-4 py-2 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Explore Inspection Mission →
          </button>
        </div>
      </section>

      {/* CRITICAL HONESTY & CURRENT STATUS CARD */}
      <section className="rounded-2xl bg-[#0d1424] border-2 border-amber-500/40 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-1">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono uppercase font-bold tracking-wider">
              <span>CURRENT HARDWARE STATUS</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              “Two Independent ESP32 Systems”
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              <strong>Transparent Exhibition Disclosure:</strong> For our school robotics & AI exhibition, the <strong>Autonomous Rover</strong> and the <strong>E-Nose Environmental Sensing Unit</strong> are presented as <strong>two distinct, independently functioning hardware systems</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <div className="font-mono text-cyan-400 font-semibold mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ESP32 System A: Rover
                </div>
                <p className="text-slate-400">
                  Processes motor H-bridge signals, ultrasonic echo pulses, and servo positioning. Operates fully autonomously on its own battery pack.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <div className="font-mono text-emerald-400 font-semibold mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ESP32 System B: E-Nose
                </div>
                <p className="text-slate-400">
                  Processes analog ADC lines from the MQ gas sensors and digital 1-wire pulses from the DHT11 sensor. Operates independently from the chassis.
                </p>
              </div>
            </div>
            <p className="text-xs font-mono text-amber-400/90 pt-1">
              * Note: The telemetry shown on this screen is generated by the centralized data bridge in simulation mode when physical hardware boards are disconnected. Real Wi-Fi endpoints can be connected at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#0b111e] border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
            <Gauge className="w-4 h-4" />
            <span>Chassis Navigation</span>
          </div>
          <div className="text-2xl font-bold text-white">4-Wheel Drive + Obstacle Avoid</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Front-mounted ultrasonic sensor swept across 180° by a micro servo. Software state machine triggers real-time evasive maneuvers when distance drops under 20 cm.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#0b111e] border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase mb-2">
            <Wind className="w-4 h-4" />
            <span>Chemical & Climate</span>
          </div>
          <div className="text-2xl font-bold text-white">Multi-Channel MQ + DHT11</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Continuous analog voltage sampling across internal resistive gas sensing elements, combined with ambient temperature and relative humidity tracking.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#0b111e] border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase mb-2">
            <GitMerge className="w-4 h-4" />
            <span>Integration Roadmap</span>
          </div>
          <div className="text-2xl font-bold text-white">Future ESP-NOW / I2C Link</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Planned future development will link both microcontrollers via ultra-fast ESP-NOW protocol, creating an unified mobile environmental inspection platform.
          </p>
        </div>
      </section>
    </div>
  );
};
